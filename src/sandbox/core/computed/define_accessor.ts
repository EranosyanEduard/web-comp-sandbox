import _isFunction from 'lodash-es/isFunction'
import { Exception, type Typedef } from '../utils'

/**
 * Определить свойство доступа для вычисляемого значения.
 * @param value - свойство доступа или геттер
 */
function defineAccessor<T>(
  value: Typedef.Utils.Accessor<T> | Typedef.Utils.LazyValue<T>
): Typedef.Utils.Accessor<T> {
  if (_isFunction(value)) {
    return {
      get: value,
      set: () => {
        throw new Exception.ReadonlyPropertyError({ property: 'value' })
      }
    }
  }
  return value
}

export default defineAccessor
