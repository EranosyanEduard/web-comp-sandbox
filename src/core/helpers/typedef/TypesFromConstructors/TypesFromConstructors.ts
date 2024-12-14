import type { ElementOf } from 'ts-essentials'
import type { CastArray } from '../CastArray'
import type { TypeConstructor } from '../TypeConstructor'
import type { TypeFromConstructor } from '../TypeFromConstructor'

/**
 * Вывести _typescript_-тип на основании его конструктора.
 * @since 1.0.0
 * @version 1.0.0
 * @example
 * TypesFromConstructors<NumberConstructor> // number
 * TypesFromConstructors<[NumberConstructor, StringConstructor]> // number | string
 */
export type TypesFromConstructors<
  T extends TypeConstructor | TypeConstructor[]
> = ElementOf<Go<CastArray<T>>>

type Go<T extends TypeConstructor[]> = {
  [P in keyof T]: TypeFromConstructor<T[P]>
}
