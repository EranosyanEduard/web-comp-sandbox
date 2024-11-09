import { currentContext } from '../current_context'
import type { Accessor } from '../helpers/typedef'
import di from './di'

/**
 * Определить поставщика значения.
 * @param key - название значения
 * @param value - значение
 */
function provide<R>(key: string, value: Accessor<R>['get']): void {
  di.provide(Symbol.for(key), currentContext.get(), value)
}

export default provide
