import _cloneDeep from 'lodash-es/cloneDeep'
import _debounce from 'lodash-es/debounce'
import { currentContext, type Context } from '../current_context'
import type { Maybe } from '../helpers/typedef'
import type { Reactive, ReactiveApi, Watcher } from './typedef'

/**
 * Сделать объект `values` реактивным.
 * @param values - произвольный объект
 */
function reactive<T extends object>(values: T): Reactive<T> {
  const _instances = new Set<Context>()
  let oldTarget: Maybe<object> = null
  const watchers = new Set<Watcher<object>>()
  const watch = _debounce<Watcher<object>>((next, prev) => {
    watchers.forEach((it) => {
      it(next, prev)
    })
    oldTarget = null
  })
  const api: ReactiveApi = {
    useContext(...instances) {
      instances.forEach((it) => {
        if (it === null || _instances.has(it)) return
        it.whenDestroyed(() => {
          _instances.delete(it)
        })
        _instances.add(it)
      })
    },
    watchers
  }
  const proxy = new Proxy(values, {
    set(target, key, value) {
      const keyAs = key as keyof T
      const prevValue = target[keyAs]
      if (prevValue !== value) {
        oldTarget ??= _cloneDeep(target)
        target[keyAs] = value
        _instances.forEach((it) => {
          it.requestRender()
        })
        watch(target, oldTarget)
      }
      return true
    }
  })
  api.useContext(currentContext.get())
  reactive.store.set(proxy, api)
  // @ts-expect-error Игнорировать ошибку типизации.
  return proxy
}

reactive.store = new WeakMap<object, ReactiveApi>()

export default reactive
