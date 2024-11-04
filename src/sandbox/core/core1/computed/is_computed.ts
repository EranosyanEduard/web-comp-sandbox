import { COMPUTED_UNIQUE_SYMBOL } from './constants'
import type { ComputedRef } from './typedef'

/**
 * Определить является ли значение вычисляемым.
 * @param value - произвольный объект
 */
function isComputedRef(value: object): value is ComputedRef<unknown> {
  return Object.hasOwn(value, COMPUTED_UNIQUE_SYMBOL)
}

export default isComputedRef
