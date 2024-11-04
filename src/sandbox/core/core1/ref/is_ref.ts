import { REF_UNIQUE_SYMBOL } from './constants'
import type { Ref } from './typedef'

/**
 * Определить является ли значение реактивным.
 * @param value - произвольный объект
 */
function isRef(value: object): value is Ref<unknown> {
  return Object.hasOwn(value, REF_UNIQUE_SYMBOL)
}

export default isRef
