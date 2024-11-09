import type {
  Accessor,
  Predicate,
  TypesFromConstructors
} from '../../helpers/typedef'
import type { RuntimeType } from './RuntimeType'

/** Конфигурация _props_-а */
export type PropOptions<T extends RuntimeType> = AllPropOptions<T>

interface AllPropOptions<
  TypeConstructor extends RuntimeType,
  TypeScriptType = TypesFromConstructors<TypeConstructor>
> {
  readonly type: TypeConstructor
  readonly default?: Accessor<TypeScriptType>['get']
  readonly required?: boolean
  readonly validator?: Predicate<TypeScriptType>
}
