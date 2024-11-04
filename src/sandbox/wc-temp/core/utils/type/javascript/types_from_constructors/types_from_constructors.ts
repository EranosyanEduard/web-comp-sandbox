import type { ElementOf } from 'ts-essentials'
import type { CastArray } from '../../utils'
import type { TypeConstructor } from '../type_constructor'
import type { TypeFromConstructor } from '../type_from_constructor'

/** Вывести _typescript_-тип на основании его конструктора */
export type TypesFromConstructors<
  T extends TypeConstructor | TypeConstructor[]
> = ElementOf<Go<CastArray<T>>>

type Go<T extends TypeConstructor[]> = {
  [P in keyof T]: TypeFromConstructor<T[P]>
}
