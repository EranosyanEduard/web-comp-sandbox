import type { AnyFunction } from 'ts-essentials'

/** Функция-предикат */
export type Predicate<T> = AnyFunction<[T], boolean>
