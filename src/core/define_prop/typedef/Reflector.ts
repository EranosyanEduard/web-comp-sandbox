import type { AnyFunction } from 'ts-essentials'

/** Функция, "отражающая" значение _props_-а в _атрибут_ */
export type Reflector<T> = AnyFunction<[T], string>
