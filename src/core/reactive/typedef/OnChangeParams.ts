/** Параметры наблюдателя за значением */
export interface OnChangeParams<T> {
  readonly nextValue: T
  readonly prevValue: T
}
