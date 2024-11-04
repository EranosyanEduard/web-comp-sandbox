import _isObject from 'lodash-es/isObject'
import type { ComputedRef } from './typedef'
import computed from './computed'

/**
 * Определить является ли значение вычисляемым.
 * @param value - произвольное значение
 */
function isComputedRef(value: unknown): value is ComputedRef<unknown> {
  return _isObject(value) && computed.store.has(value)
}

export default isComputedRef
