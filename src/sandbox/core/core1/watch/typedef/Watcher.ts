import type { AnyFunction } from 'ts-essentials'

/** Обработчик изменения данных */
export type Watcher<T> = AnyFunction<[T, T], void>
