import { currentInstance } from '../current_instance'
import { DataStructure, type Typedef } from '../utils'
import { COMPUTED_UNIQUE_SYMBOL } from './constants'
import defineAccessor from './define_accessor'
import type { ComputedMeta, ComputedRef, ReadonlyComputedRef } from './typedef'

/**
 * Определить вычисляемое значение.
 * @param value - свойство доступа
 * @returns свойство доступа, доступное для чтения и записи
 */
function computed<T>(value: Typedef.Utils.Accessor<T>): ComputedRef<T>

/**
 * Определить вычисляемое значение.
 * @param value - геттер
 * @returns свойство доступа, доступное для чтения
 */
function computed<T>(value: Typedef.Utils.LazyValue<T>): ReadonlyComputedRef<T>

function computed<T>(
  value: Typedef.Utils.Accessor<T> | Typedef.Utils.LazyValue<T>
): ComputedRef<T> | ReadonlyComputedRef<T> {
  const accessor = defineAccessor(value)
  let lazyValue = new DataStructure.Lazy(accessor.get)
  const meta: ComputedMeta = {
    components: new Set([currentInstance.get()]),
    isComputed: true,
    subscribe: () => {
      meta.components.forEach((component) => {
        component?.computedStore.subscribe(() => {
          lazyValue = lazyValue.map(accessor.get)
        })
      })
    }
  }
  const proxy = new Proxy(lazyValue, {
    get: () => lazyValue.value,
    set: (_1, _2, newValue: T) => {
      accessor.set(newValue)
      return true
    }
  })
  meta.subscribe()
  Reflect.defineProperty(proxy, COMPUTED_UNIQUE_SYMBOL, {
    configurable: false,
    enumerable: false,
    value: meta,
    writable: false
  })
  // @ts-expect-error Причина ошибки - отсутствие в типе `Lazy` значения
  // свойства, добавляемого утилитой типа `Opaque` в тип `ComputedRef`,
  // что не может привести к ошибке.
  return proxy
}

export default computed
