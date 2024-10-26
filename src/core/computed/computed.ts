import _isEmpty from 'lodash-es/isEmpty'
import { currentContext } from '../current_context'
import { Lazy } from '../helpers/data_structure'
import type { Accessor } from '../helpers/typedef'
import type { Watcher, ReactiveApi } from '../reactive'
import defineAccessor from './define_accessor'
import type { ComputedRef, ReadonlyComputedRef } from './typedef'

/**
 * Определить вычисляемое значение.
 * @param accessor - свойство доступа
 * @returns свойство доступа, доступное для чтения и записи
 */
function computed<T>(accessor: Accessor<T>): ComputedRef<T>

/**
 * Определить вычисляемое значение.
 * @param getter - геттер
 * @returns свойство доступа, доступное для чтения
 */
function computed<T>(getter: Accessor<T>['get']): ReadonlyComputedRef<T>

function computed<T>(
  value: Accessor<T> | Accessor<T>['get']
): ComputedRef<T> | ReadonlyComputedRef<T> {
  const accessor = defineAccessor(value)
  const watchers = new Set<Watcher<T>>()
  let lazyValue = new Lazy<T>(accessor.get)
  const api: ReactiveApi<T> = {
    addContext(context) {
      context?.whenRequestedRender(() => {
        const oldLazyValue = lazyValue
        lazyValue = lazyValue.map(accessor.get)
        if (_isEmpty(watchers) || oldLazyValue.value === lazyValue.value) {
          return
        }
        watchers.forEach((it) => {
          it(lazyValue.value, oldLazyValue.value)
        })
      })
    },
    watch(watcher) {
      watchers.add(watcher)
      return () => {
        watchers.delete(watcher)
      }
    }
  }
  const proxy = new Proxy(
    {},
    {
      get() {
        return lazyValue.value
      },
      set(_1, _2, newValue: T) {
        accessor.set(newValue)
        return true
      }
    }
  )
  api.addContext(currentContext.get())
  computed._store.set(proxy, api)
  // @ts-expect-error Игнорировать ошибку типизации.
  return proxy
}

computed._store = new WeakMap<object, Pick<ReactiveApi<unknown>, 'watch'>>()

export default computed
