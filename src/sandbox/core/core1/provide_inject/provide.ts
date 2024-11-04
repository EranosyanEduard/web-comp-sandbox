import { accessor } from '../current_instance'
import type { Accessor } from '../helpers/typedef'
import { PROVIDERS } from './constants'

/**
 * Определить поставщика значения.
 * @param key - название значения
 * @param value - значение
 */
function provide<R>(key: string, value: Accessor<R>['get']): void {
  const instance = accessor.get()
  if (instance === null) return
  const uniqueSymbol = Symbol.for(key)
  if (PROVIDERS.has(uniqueSymbol)) {
    PROVIDERS.get(uniqueSymbol)?.add(instance)
  } else {
    PROVIDERS.set(uniqueSymbol, new Set([instance]))
  }
  Reflect.defineProperty(instance, uniqueSymbol, { get: value })
  instance.whenDestroyed(() => {
    PROVIDERS.get(uniqueSymbol)?.delete(instance)
  })
}

export default provide
