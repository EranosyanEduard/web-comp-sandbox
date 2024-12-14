import _isEmpty from 'lodash-es/isEmpty'
import { currentContext } from '../current_context'
import type { Accessor } from '../helpers/typedef'
import type { OnChange, ReactiveApi } from '../reactive'
import defineAccessor from './define_accessor'
import type { ComputedRef, ReadonlyComputedRef } from './typedef'

const INSTANCES = new WeakMap<object, ReactiveApi<object>>()

/**
 * Определить вычисляемое значение.
 * @param accessor - свойство доступа
 * @returns свойство доступа, доступное для чтения и записи
 * @since 1.0.0
 * @version 1.0.0
 */
function computed<T>(accessor: Accessor<T>): ComputedRef<T>

/**
 * Определить вычисляемое значение.
 * @param getter - геттер
 * @returns свойство доступа, доступное для чтения
 * @since 1.0.0
 * @version 1.0.0
 */
function computed<T>(getter: Accessor<T>['get']): ReadonlyComputedRef<T>

function computed<T>(
  value: Accessor<T> | Accessor<T>['get']
): ComputedRef<T> | ReadonlyComputedRef<T> {
  const accessor = defineAccessor(value)
  const changeSet = new Set<OnChange<T>>()
  const change: OnChange<T> = (options) => {
    changeSet.forEach((onchange) => {
      onchange(options)
    })
  }
  let prevValue = accessor.get()
  const proxy = new Proxy(
    {},
    {
      get: () => prevValue,
      set: (_1, _2, newValue: T) => {
        accessor.set(newValue)
        return true
      }
    }
  )
  currentContext.get()?.whenRequestedRender(() => {
    const _prevValue = prevValue
    const nextValue = accessor.get()
    if (!_isEmpty(changeSet) && _prevValue !== nextValue) {
      change({ nextValue, prevValue: _prevValue })
    }
    prevValue = nextValue
  })
  INSTANCES.set(proxy, {
    whenChanged: (onchange) => {
      // @ts-expect-error игнорировать ошибку типизации:
      // невозможно обеспечить соответствие типов.
      const onchangeAs: typeof change = onchange
      changeSet.add(onchangeAs)
      return (): void => {
        changeSet.delete(onchangeAs)
      }
    }
  })
  // @ts-expect-error игнорировать ошибку типизации:
  // преобразовать тип `{}` в уникальный тип с помощью утилиты типа `Opaque`.
  return proxy
}

computed._INSTANCES = INSTANCES as Pick<typeof INSTANCES, 'get' | 'has'>

export default computed
