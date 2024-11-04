import type { Typedef } from '../../utils'

/** Тип _props_-а, использующийся при его объявлении */
export type RuntimeType =
  | Typedef.JavaScript.TypeConstructor
  | Typedef.JavaScript.TypeConstructor[]
