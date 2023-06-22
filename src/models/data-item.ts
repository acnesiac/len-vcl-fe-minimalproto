export interface IDataItem<T> {
  id?: T;
  name?: string;
  disabledFlag?: boolean;
}

export interface IDataItemLabel<T> extends IDataItem<T> {
  label?: string;
}
