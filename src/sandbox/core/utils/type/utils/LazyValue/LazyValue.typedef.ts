import type { AnyFunction } from 'ts-essentials'

/** Ленивое значение типа `T` */
export type LazyValue<T> = AnyFunction<[], T>
