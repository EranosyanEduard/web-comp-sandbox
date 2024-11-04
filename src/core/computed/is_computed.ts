import _isObject from 'lodash-es/isObject'
import type { ComputedRef } from './typedef'
import computed from './computed'

/**
 * Определить является ли значение вычисляемым.
 * @param value - произвольное значение
 * @since 1.0.0
 * @version 1.0.0
 */
function isComputedRef(value: unknown): value is ComputedRef<unknown> {
  return _isObject(value) && computed._INSTANCES.has(value)
}

export default isComputedRef
