import _isFunction from 'lodash-es/isFunction'
import type { Context } from '../current_context'
import type { DependencyInjection } from './typedef'

const dependencies = new Map<symbol, Set<Context>>()
/** _API_ для инъекции зависимостей */
const di: DependencyInjection<unknown> = {
  inject: (key, context, fallbackValue): unknown => {
    if (context === null) return fallbackValue()
    const contexts = [...(dependencies.get(key) ?? [])]
    const parentContext = contexts.findLast((it) => it.containsContext(context))
    // @ts-expect-error игнорировать ошибку типизации:
    // невозможно обеспечить соответствие типов.
    const provide = parentContext?.[uniqueSymbol]
    return _isFunction(provide) ? provide() : fallbackValue()
  },
  provide: (key, context, value) => {
    if (context === null) return
    if (dependencies.has(key)) {
      dependencies.get(key)?.add(context)
    } else {
      dependencies.set(key, new Set([context]))
    }
    context.whenDestroyed(() => {
      dependencies.get(key)?.delete(context)
    })
    Reflect.defineProperty(context, key, { get: value })
  }
}

export default di
