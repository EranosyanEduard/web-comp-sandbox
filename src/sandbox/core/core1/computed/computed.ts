import _isEmpty from 'lodash-es/isEmpty'
import _noop from 'lodash-es/noop'
import {
  type CurrentInstance,
  accessor as currentInstance,
  type Instance
} from '../current_instance'
import { Lazy } from '../helpers/data_structure'
import type { Accessor } from '../helpers/typedef'
import type { ReactiveApi } from '../reactive'
import { COMPUTED_UNIQUE_SYMBOL } from './constants'
import defineAccessor from './define_accessor'
import type { ComputedRef } from './typedef'

/**
 * Определить вычисляемое значение.
 * @param value - свойство доступа
 * @returns свойство доступа, доступное для чтения и записи
 */
function computed<T>(value: Accessor<T>): ComputedRef<T>

/**
 * Определить вычисляемое значение.
 * @param value - геттер
 * @returns свойство доступа, доступное для чтения
 */
function computed<T>(value: Accessor<T>['get']): Readonly<ComputedRef<T>>

function computed<T>(
  value: Accessor<T> | Accessor<T>['get']
): ComputedRef<T> | Readonly<ComputedRef<T>> {
  const accessor = defineAccessor(value)
  const _instances = new Set<Instance>()
  const _value = {}
  let _instance: CurrentInstance = null
  let lazyValue = new Lazy(accessor.get)
  const api = Object.freeze({
    updateInstances(...instances) {
      instances.forEach((it) => {
        if (it === null) return
        if (_instances.has(it)) return
        _instances.add(it)
        it.whenDestroyed(() => {
          _instances.delete(it)
          if (_instance === it) {
            _instance = null
            setupWhenRequestedRender()
          }
        })
      })
      setupWhenRequestedRender()
    },
    watchers: new Set()
  } satisfies ReactiveApi)
  const setupWhenRequestedRender: VoidFunction = () => {
    if (_instance !== null) return
    const [instance = null] = [..._instances]
    _instance = instance
    _instance?.whenRequestedRender(() => {
      const prevValue = lazyValue.value
      lazyValue = lazyValue.map(accessor.get)
      if (_isEmpty(api.watchers)) return
      if (prevValue === lazyValue.value) return
      api.watchers.forEach((watcher) => {
        watcher(lazyValue.value, prevValue)
      })
    })
  }
  const computedValue = new Proxy(_value, {
    set(_1, _2, newValue: T) {
      accessor.set(newValue)
      return true
    }
  })
  Reflect.defineProperty(_value, 'value', {
    set: _noop,
    get() {
      return lazyValue.value
    }
  })
  Reflect.defineProperty(_value, COMPUTED_UNIQUE_SYMBOL, {
    configurable: false,
    enumerable: false,
    value: api,
    writable: false
  })
  api.updateInstances(currentInstance.get())
  // @ts-expect-error Игнорировать typescript-ошибку.
  return computedValue
}

export default computed
