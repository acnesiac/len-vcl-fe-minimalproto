import { catchError, EMPTY, finalize, first, map, race } from "rxjs";
import { sse$, sseClose, ssePolling$ } from "../../services/sse.service";
import { type SseMessageEventData } from "./models/sse-message-event-data";

export const sseEventsApiAsync = async (subscriberId: string): Promise<SseMessageEventData> =>
  await new Promise((resolve, reject) => {
    race([sse$(subscriberId), ssePolling$(subscriberId)])
      .pipe(
        first(),
        map(data => {
          if (data) {
            resolve(data);
            return;
          }
          reject(new Error("No SSE received"));
        }),
        catchError(error => {
          reject(error);
          return EMPTY;
        }),
        finalize(() => {
          sseClose();
        }),
      )
      .subscribe();
  });
