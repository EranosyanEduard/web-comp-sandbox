import { reactive, REACTIVE_UNIQUE_SYMBOL } from '../reactive'
import { REF_UNIQUE_SYMBOL } from './constants'
import type { Ref } from './typedef'

/**
 * Сделать значение `value` реактивным.
 * @param value - произвольное значение
 */
function ref<T>(value: T): Ref<T> {
  const reactiveValues = reactive({ value })
  Reflect.defineProperty(reactiveValues, REF_UNIQUE_SYMBOL, {
    configurable: false,
    enumerable: false,
    value: reactiveValues[REACTIVE_UNIQUE_SYMBOL],
    writable: false
  })
  // @ts-expect-error Игнорировать typescript-ошибку.
  return reactiveValues
}

export default ref
