import type { Typedef } from '../../utils'
import type { RuntimeType } from './RuntimeType'

/** Конфигурация _props_-а */
export type PropOptions<T extends RuntimeType> = AllPropOptions<T>

interface AllPropOptions<
  TypeConstructor extends RuntimeType,
  TypeScriptType = Typedef.JavaScript.TypesFromConstructors<TypeConstructor>
> {
  readonly type: TypeConstructor
  readonly default?: Typedef.Utils.LazyValue<TypeScriptType>
  readonly required?: boolean
  readonly validator?: Typedef.Utils.Predicate<TypeScriptType>
}
