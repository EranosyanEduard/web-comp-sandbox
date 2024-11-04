import type { AnyFunction } from 'ts-essentials'

/** Свойство доступа */
export interface Accessor<T> {
  readonly get: AnyFunction<[], T>
  readonly set: AnyFunction<[T], void>
}
