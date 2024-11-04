/** История значений */
export interface ValuesHistory<T> {
  readonly next: T
  readonly prev: T
}
