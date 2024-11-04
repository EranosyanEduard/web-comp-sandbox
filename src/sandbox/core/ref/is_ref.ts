import { ReactiveConstant } from '../reactive'

/**
 * Определить является ли объект `values` реактивным.
 * @param value - произвольный объект
 */
function isRef<T extends object>(value: T): boolean {
  const descriptor = Object.getOwnPropertyDescriptor(
    value,
    ReactiveConstant.REACTIVE_DESCRIPTOR_UNIQUE_SYMBOL
  )
  return descriptor?.value.isRef === true
}

export default isRef
