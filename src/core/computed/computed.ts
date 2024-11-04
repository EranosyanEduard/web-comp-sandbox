import _isEmpty from 'lodash-es/isEmpty'
import { currentContext } from '../current_context'
import { Lazy } from '../helpers/data_structure'
import type { Accessor } from '../helpers/typedef'
import type { Watcher, ReactiveApi } from '../reactive'
import defineAccessor from './define_accessor'
import type { ComputedRef, ReadonlyComputedRef } from './typedef'

const INSTANCES = new WeakMap<object, ReactiveApi<object>>()

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
  const changeSet = new Set<Watcher<Lazy<T>, T>>()
  const change: Watcher<Lazy<T>, T> = (options) => {
    changeSet.forEach((onchange) => {
      onchange(options)
    })
  }
  const values = {}
  let lazyValue = new Lazy<T>(accessor.get)
  const proxy = new Proxy(values, {
    get() {
      return lazyValue.value
    },
    set(_1, _2, newValue: T) {
      accessor.set(newValue)
      return true
    }
  })
  currentContext.get()?.whenRequestedRender(() => {
    const prevValue = lazyValue.value
    lazyValue = lazyValue.map(accessor.get)
    if (_isEmpty(changeSet) || prevValue === lazyValue.value) return
    change({ nextValue: lazyValue.value, prevValue })
  })
  INSTANCES.set(proxy, {
    whenChanged(onchange) {
      // @ts-expect-error игнорировать ошибку типизации:
      // невозможно обеспечить соответствие типов.
      const onchangeAs: typeof change = onchange
      changeSet.add(onchangeAs)
      const stop = (): void => {
        changeSet.delete(onchangeAs)
      }
      return stop
    }
  })
  // @ts-expect-error игнорировать ошибку типизации:
  // преобразовать тип `{}` в уникальный тип с помощью утилиты типа `Opaque`.
  return proxy
}

computed._INSTANCES = INSTANCES as Pick<typeof INSTANCES, 'get' | 'has'>

export default computed
