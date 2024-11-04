import _isObject from 'lodash-es/isObject'
import Reactive from './Reactive.impl'

/**
 * Определить является ли значение `values` реактивным.
 * @param values - произвольный объект
 */
function isReactive(values: unknown): values is Reactive<object> {
  return _isObject(values) && Reactive.store.has(values)
}

export default isReactive
