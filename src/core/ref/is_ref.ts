import _isObject from 'lodash-es/isObject'
import ref from './ref'
import type { Ref } from './typedef'

/**
 * Определить является ли значение реактивным.
 * @param value - произвольный объект
 */
function isRef(value: unknown): value is Ref<unknown> {
  return _isObject(value) && ref._store.has(value)
}

export default isRef
