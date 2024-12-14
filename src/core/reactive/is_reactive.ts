import _isObject from 'lodash-es/isObject'
import reactive from './reactive'
import type { Reactive } from './typedef'

/**
 * Определить является значение `values` реактивным.
 * @param values - произвольное значение
 * @since 1.0.0
 * @version 1.0.0
 */
function isReactive(values: unknown): values is Reactive<object> {
  return _isObject(values) && reactive._INSTANCES.has(values)
}

export default isReactive
