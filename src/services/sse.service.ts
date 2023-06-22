import { BehaviorSubject, finalize, map, Observable, of, switchMap, timer } from "rxjs";
import { documentProcessedByApiAsync } from "../api/document/document-upload.api";
import { type SseMessageEventData } from "../api/sse/models/sse-message-event-data";
import { envConfig } from "../config";
import { logger } from "../utils/logger";

let currentEventSource: EventSource | null = null;

export const sseProgressSubject = new BehaviorSubject<number | null>(null);

export function sseInstance(url: string): EventSource {
  sseClose();
  currentEventSource = new EventSource(url);
  return currentEventSource;
}

/**
 * Closes current "EventSource" instance if any
 */
export function sseClose(): void {
  if (currentEventSource) {
    const urlPattern = new URL(currentEventSource.url);
    const previousSubscriber = urlPattern.searchParams.get("subscriberId");
    logger.debug("SSE Closing connection to current susbcriber:", previousSubscriber);
    currentEventSource?.onerror?.(new Event("close"));
    currentEventSource = null;
  }
  sseProgressSubject.next(null);
}

export function sse$(subscriberId: string): Observable<SseMessageEventData> {
  const source = new Observable<SseMessageEventData>(subscriber => {
    const segment = `${envConfig.apiSuffixBff}/sse/events`;
    const params = new URLSearchParams({ subscriberId });
    const url = `${envConfig.apiBaseURL}${segment}?${params}`;

    const eventSource = sseInstance(url);
    eventSource.onmessage = (messageEvent: MessageEvent) => {
      logger.debug("SSE onmessage", { messageEvent });
      const data = JSON.parse(messageEvent.data) as SseMessageEventData;
      subscriber.next(data);
      logger.debug("SSE", "Closing event source");
      eventSource.close();
    };

    eventSource.onerror = event => {
      logger.debug("SSE onerror", event);
      subscriber.error(event);
      logger.debug("SSE", "Closing event source");
      eventSource.close();
    };

    return () => {
      logger.debug("SSE", "Teardown subscription & closing event source");
      eventSource.close();
    };
  });
  return source;
}

// #region Polling strategy to determine whether the blob is already processed and no SSE received
export function ssePolling$(subscriberId: string): Observable<SseMessageEventData | null> {
  let pollingCounter = 1;
  function sourcePollingTimeout(): Observable<SseMessageEventData | null> {
    const source = timer(envConfig.pollingInterval).pipe(
      map(() => {
        logger.debug("SSE", "Polling attempt:", pollingCounter);
        const progress = (pollingCounter / envConfig.pollingAttempts) * 100;
        sseProgressSubject.next(progress);
      }),
      switchMap(async () => await documentProcessedByApiAsync<SseMessageEventData | null>(subscriberId)),
      switchMap((messageEvent: SseMessageEventData | null) => {
        if (messageEvent) return of(messageEvent);
        pollingCounter++;
        if (pollingCounter > envConfig.pollingAttempts) throw new Error("SSE polling timeout reached");
        return sourcePollingTimeout();
      }),
    );
    return source;
  }
  const source = sourcePollingTimeout().pipe(
    finalize(() => {
      logger.debug("SSE", "Polling finalized, max attempt reached:", envConfig.pollingAttempts);
    }),
  );
  return source;
}
// #endregion
