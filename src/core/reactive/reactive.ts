import _debounce from 'lodash-es/debounce'
import { currentContext } from '../current_context'
import type { Reactive, ReactiveApi, Watcher } from './typedef'

const INSTANCES = new WeakMap<object, ReactiveApi<object>>()

/**
 * Сделать объект `values` реактивным.
 * @param values - произвольный объект
 */
function reactive<T extends object>(values: T): Reactive<T> {
  const context = currentContext.get()
  const changeSet = new Set<Watcher<T, T[keyof T]>>()
  const change: Watcher<T, T[keyof T]> = (options) => {
    context?.requestRender()
    changeSet.forEach((onchange) => {
      onchange(options)
    })
  }
  const debounceChange = _debounce(change)
  const proxy = new Proxy(values, {
    set(target, key, value) {
      const keyAs = key as keyof T
      const prevValue = target[keyAs]
      if (prevValue !== value) {
        target[keyAs] = value
        debounceChange({ nextValue: value, prevValue })
      }
      return true
    }
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
  // преобразовать тип `T` в уникальный тип с помощью утилиты типа `Opaque`.
  return proxy
}

reactive._INSTANCES = INSTANCES as Pick<typeof INSTANCES, 'get' | 'has'>

export default reactive
