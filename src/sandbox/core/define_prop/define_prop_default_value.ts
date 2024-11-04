import type { Typedef } from '../utils'
import { PropValueError } from './errors'
import type { DefaultValueParams, RuntimeType } from './typedef'

/**
 * Определить значение _props_-а по умолчанию.
 * @param params - конфигурация значения по умолчанию
 */
function defineDefaultValue<T extends RuntimeType>(
  params: DefaultValueParams<T>
): Typedef.Utils.LazyValue<Typedef.JavaScript.TypesFromConstructors<T>> {
  const { default: lazyDefault, name, required = false } = params
  if (required) {
    return () => {
      throw new PropValueError({ name, reason: 'MISSING_REQUIRED_PROP' })
    }
  }
  return (
    lazyDefault ??
    (() => {
      throw new PropValueError({ name, reason: 'MISSING_DEFAULT_PROP' })
    })
  )
}

export default defineDefaultValue