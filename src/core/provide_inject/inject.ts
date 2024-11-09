import { currentContext } from '../current_context'
import type { Accessor } from '../helpers/typedef'
import di from './di'

/**
 * Определить приёмник значения.
 * @param key - название значения
 * @param fallbackValue - значение по умолчанию
 */
function inject<R>(key: string, fallbackValue: Accessor<R>['get']): R {
  // @ts-expect-error игнорировать ошибку типизации:
  // невозможно обеспечить соответствие типов.
  return di.inject(Symbol.for(key), currentContext.get(), fallbackValue)
}

export default inject
