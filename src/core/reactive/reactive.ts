import _cloneDeep from 'lodash-es/cloneDeep'
import _debounce from 'lodash-es/debounce'
import type { Maybe } from '../helpers/typedef'
import { currentContext } from '../current_context'
import type { Reactive, ReactiveApi, Watcher } from './typedef'

/**
 * Сделать объект `values` реактивным.
 * @param values - произвольный объект
 */
function reactive<T extends object>(values: T): Reactive<T> {
  const watchers = new Set<Watcher<T>>()
  let oldValues: Maybe<T> = null
  const requestWatch = _debounce<Watcher<T>>((next, prev) => {
    watchers.forEach((it) => {
      it(next, prev)
    })
    oldValues = null
  })
  const api: ReactiveApi<T> = {
    addContext(context) {
      if (context === null) return
      context.whenDestroyed(
        api.watch(() => {
          context.requestRender()
        })
      )
    },
    watch(watcher) {
      watchers.add(watcher)
      return () => {
        watchers.delete(watcher)
      }
    }
  }
  const proxy = new Proxy(values, {
    set(target, key, value) {
      const keyAs = key as keyof T
      const prevValue = target[keyAs]
      if (prevValue !== value) {
        oldValues ??= _cloneDeep(target)
        target[keyAs] = value
        requestWatch(target, oldValues)
      }
      return true
    }
  })
  api.addContext(currentContext.get())
  reactive._store.set(proxy, api)
  // @ts-expect-error игнорировать ошибку типизации:
  // причина ошибки - модификация типа `T` утилитой типа `Opaque`,
  // которая превращает тип `T` в уникальный.
  return proxy
}

reactive._store = new WeakMap<object, ReactiveApi<object>>()

export default reactive
