import type { IsAny, IsNever } from 'ts-essentials'
import type { TypeConstructor } from '../TypeConstructor'

/**
 * Вывести _typescript_-тип на основании конструктора типа.
 * @since 1.0.0
 * @version 1.0.0
 * @example
 * TypeFromConstructor<NumberConstructor> // number
 * TypeFromConstructor<ObjectConstructor> // object
 * TypeFromConstructor<StringConstructor> // string
 */
export type TypeFromConstructor<T extends TypeConstructor> =
  IsAny<T> extends true ? never : IsNever<T> extends true ? never : Go<T>

type Go<T extends TypeConstructor> = ReturnType<T>
