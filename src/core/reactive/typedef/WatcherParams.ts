/** Параметры наблюдателя за значением */
export interface WatcherParams<T> {
  readonly nextValue: T
  readonly prevValue: T
}
