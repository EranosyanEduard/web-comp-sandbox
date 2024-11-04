import type { ElementOf } from 'ts-essentials'
import type { CastArray } from '../../utils'
import type { TypeConstructor } from '../TypeConstructor'
import type { TypeFromConstructor } from '../TypeFromConstructor'

/** Вывести _typescript_-тип на основании его конструктора */
export type TypesFromConstructors<
  T extends TypeConstructor | TypeConstructor[]
> = ElementOf<Go<CastArray<T>>>

type Go<T extends TypeConstructor[]> = {
  [P in keyof T]: TypeFromConstructor<T[P]>
}
