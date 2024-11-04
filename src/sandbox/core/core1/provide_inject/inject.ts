import { accessor } from '../current_instance'
import type { Accessor } from '../helpers/typedef'
import { PROVIDERS } from './constants'

/**
 * Определить приёмник значения.
 * @param key - название значения
 * @param fallbackValue - значение по умолчанию
 */
function inject<R>(key: string, fallbackValue: Accessor<R>['get']): R {
  const instance = accessor.get()
  if (instance !== null) {
    const uniqueSymbol = Symbol.for(key)
    const providers = [...(PROVIDERS.get(uniqueSymbol) ?? [])]
    const provider = providers.findLast((it) => it.containsInstance(instance))
    if (provider !== undefined) {
      // @ts-expect-error Наличие свойства у компонента и его значение
      // гарантируются тем, что множество поставщиков значений заполняется с
      // помощью функции provide.
      return provider[uniqueSymbol]()
    }
  }
  return fallbackValue()
}

export default inject
