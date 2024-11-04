import type { AnyFunction } from 'ts-essentials'

/** Функция-предикат типа `T` */
export type Predicate<T> = AnyFunction<[T], boolean>
