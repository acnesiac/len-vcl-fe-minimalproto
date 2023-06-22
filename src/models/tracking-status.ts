export interface ITrackingStatus<T> {
  id?: string;
  name?: string;
  loading?: boolean;
  error?: any;
  success?: boolean | null;
  data?: T | null;
}

export type RecordTrackingStatus<T, E = unknown> = Record<string, ITrackingStatus<T> & E>;
