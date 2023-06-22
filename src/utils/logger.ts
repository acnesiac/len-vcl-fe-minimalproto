import { useEffect } from "react";
import { envConfig } from "../config";

const timestamp = () => new Date().toISOString();
const tracking = "color: #47B04B; font-weight: 900;";
const debug = "color: #A569BD; font-weight: 900;";
const warn = "color: #F1C40F; font-weight: 900;";
const error = "color: #E74C3C; font-weight: 900;";
const info = "color: #5499C7; font-weight: 900;";
const trace = "color: #808B96; font-weight: 900;";

const priorities: Record<string, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
};

function logLevel(level?: string): number {
  const priority = priorities[level ?? ""];
  if (typeof priority === "number") return priority;
  return priorities.info;
}

export const logger = {
  get priority() {
    return logLevel(envConfig.logLevel);
  },
  debug(...params: any[]) {
    if (this.priority > priorities.debug) return;
    console.log(`%c ${timestamp()}`, debug, ...params);
  },
  error(...params: any[]) {
    if (this.priority > priorities.error) return;
    console.error(`%c ${timestamp()}`, error, ...params);
  },
  info(...params: any[]) {
    if (this.priority > priorities.info) return;
    console.info(`%c ${timestamp()}`, info, ...params);
  },
  warn(...params: any[]) {
    if (this.priority > priorities.warn) return;
    console.warn(`%c ${timestamp()}`, warn, ...params);
  },
  trace(...params: any[]) {
    if (this.priority > priorities.trace) return;
    console.trace(`%c ${timestamp()}`, trace, ...params);
  },
  useTracking(value: any) {
    useEffect(() => {
      if (envConfig.production) return;
      console.log(`%c ${timestamp()} Tracking:`, tracking, value);
    }, [value]);
  },
};
