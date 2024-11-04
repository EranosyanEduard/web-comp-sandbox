import { REACTIVE_DESCRIPTOR_UNIQUE_SYMBOL } from './constants'

/**
 * Определить является ли объект `values` реактивным.
 * @param values - произвольный объект
 */
function isReactive<T extends object>(values: T): boolean {
  const descriptor = Object.getOwnPropertyDescriptor(
    values,
    REACTIVE_DESCRIPTOR_UNIQUE_SYMBOL
  )
  return descriptor?.value.isReactive === true
}

export default isReactive
