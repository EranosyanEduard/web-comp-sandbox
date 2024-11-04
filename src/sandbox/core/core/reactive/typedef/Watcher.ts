import type { AnyFunction } from 'ts-essentials'

/** Наблюдатель за значением */
export type Watcher<T> = AnyFunction<[T, T], void>
