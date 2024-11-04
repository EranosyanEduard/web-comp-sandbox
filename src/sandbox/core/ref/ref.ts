import { reactive, ReactiveConstant } from '../reactive'
import type { Ref } from './typedef'

/**
 * Сделать значение `value` реактивным.
 * @param value - произвольное значение
 */
function ref<T>(value: T): Ref<T> {
  const values = reactive({ value })
  values[ReactiveConstant.REACTIVE_DESCRIPTOR_UNIQUE_SYMBOL].isRef = true
  // @ts-expect-error Причина ошибки - несоответствие значений свойств,
  // добавляемых утилитой типа `Opaque` в типы `Reactive` и `Ref`, что не может
  // привести к ошибке.
  return values
}

export default ref
