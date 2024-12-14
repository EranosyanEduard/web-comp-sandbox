import _isFunction from 'lodash-es/isFunction'
import { ReadonlyPropertyError } from '../helpers/error'
import type { Accessor } from '../helpers/typedef'

/**
 * Определить свойство доступа для вычисляемого значения.
 * @param value - свойство доступа или геттер
 */
function defineAccessor<T>(
  value: Accessor<T> | Accessor<T>['get']
): Accessor<T> {
  if (_isFunction(value)) {
    return {
      get: value,
      set: () => {
        throw new ReadonlyPropertyError({ property: 'value' })
      }
    }
  }
  return value
}

export default defineAccessor
