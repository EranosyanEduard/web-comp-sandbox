import _isEmpty from 'lodash-es/isEmpty'
import {
  type Context,
  currentContext,
  type CurrentContext
} from '../current_context'
import { Lazy } from '../helpers/data_structure'
import type { Accessor } from '../helpers/typedef'
import type { Watcher, ReactiveApi } from '../reactive'
import defineAccessor from './define_accessor'
import type { ComputedRef } from './typedef'

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
function computed<T>(getter: Accessor<T>['get']): Readonly<ComputedRef<T>>

function computed<T>(
  value: Accessor<T> | Accessor<T>['get']
): ComputedRef<T> | Readonly<ComputedRef<T>> {
  const _accessor = defineAccessor(value)
  const _instances = new Set<Context>()
  const _watchers = new Set<Watcher<object>>()
  let _instance: CurrentContext = null
  let _lazyValue = new Lazy(_accessor.get)
  const bindToInstance: VoidFunction = () => {
    if (_instance !== null) return
    const [instance = null] = [..._instances]
    _instance = instance
    _instance?.whenRequestedRender(() => {
      const oldLazyValue = _lazyValue
      _lazyValue = _lazyValue.map(_accessor.get)
      if (_isEmpty(_watchers) || oldLazyValue.value === _lazyValue.value) {
        return
      }
      _watchers.forEach((it) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        it(_lazyValue, oldLazyValue)
      })
    })
  }
  const api: ReactiveApi = {
    useContext(...instances) {
      instances.forEach((it) => {
        if (it === null || _instances.has(it)) return
        _instances.add(it)
        it.whenDestroyed(() => {
          _instances.delete(it)
          if (_instance !== it) return
          _instance = null
          bindToInstance()
        })
      })
      bindToInstance()
    },
    watchers: _watchers
  }
  const proxy = new Proxy(
    {},
    {
      get() {
        return _lazyValue.value
      },
      set(_1, _2, newValue: T) {
        _accessor.set(newValue)
        return true
      }
    }
  )
  api.useContext(currentContext.get())
  computed.store.set(proxy, api)
  // @ts-expect-error Игнорировать ошибку типизации.
  return proxy
}

computed.store = new WeakMap<object, ReactiveApi>()

export default computed
