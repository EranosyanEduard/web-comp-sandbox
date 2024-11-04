import _debounce from 'lodash-es/debounce'
import type { ValueOf } from 'ts-essentials'
import { currentContext } from '../current_context'
import type { Reactive, ReactiveApi, OnChange } from './typedef'

const INSTANCES = new WeakMap<object, ReactiveApi<object>>()

/**
 * Сделать объект `values` реактивным.
 * @param values - произвольный объект
 * @since 1.0.0
 * @version 1.0.0
 */
function reactive<T extends object>(values: T): Reactive<T> {
  const context = currentContext.get()
  const changeSet = new Set<OnChange<ValueOf<T>>>()
  const change: OnChange<ValueOf<T>> = (options) => {
    context?.requestRender()
    changeSet.forEach((onchange) => {
      onchange(options)
    })
  }
  const changeLazy = _debounce(change)
  const proxy = new Proxy(values, {
    set: (target, key, value) => {
      const keyAs = key as keyof T
      const prevValue = target[keyAs] as ValueOf<T>
      if (prevValue !== value) {
        target[keyAs] = value
        changeLazy({ nextValue: value, prevValue })
      }
      return true
    }
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
  // преобразовать тип `T` в уникальный тип с помощью утилиты типа `Opaque`.
  return proxy
}

reactive._INSTANCES = INSTANCES as Pick<typeof INSTANCES, 'get' | 'has'>

export default reactive
