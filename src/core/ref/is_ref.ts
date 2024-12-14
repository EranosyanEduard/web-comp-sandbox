import _isObject from 'lodash-es/isObject'
import ref from './ref'
import type { Ref } from './typedef'

/**
 * Определить является ли значение реактивным.
 * @param value - произвольный объект
 * @since 1.0.0
 * @version 1.0.0
 */
function isRef(value: unknown): value is Ref<unknown> {
  return _isObject(value) && ref._INSTANCES.has(value)
}

export default isRef
