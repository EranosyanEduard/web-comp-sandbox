import _isObject from 'lodash-es/isObject'
import { currentInstance } from '../current_instance'
import { REACTIVE_DESCRIPTOR_UNIQUE_SYMBOL } from './constants'
import type { Reactive, ReactiveDescriptor } from './typedef'

/**
 * Сделать объект `values` реактивным.
 * @param values - произвольный объект
 */
function reactive<T extends object>(values: T): Reactive<T> {
  const component = currentInstance.get()
  const descriptor: ReactiveDescriptor = {
    components: new Set(),
    isReactive: true,
    isRef: false
  }
  if (_isObject(component)) {
    descriptor.components.add(component)
  }
  const proxy = new Proxy(values, {
    set: (target, key, value) => {
      const keyAs = key as keyof T
      if (target[keyAs] !== value) {
        target[keyAs] = value
        descriptor.components.forEach((component) => {
          component.requestRender()
        })
      }
      return true
    }
  })
  proxy[REACTIVE_DESCRIPTOR_UNIQUE_SYMBOL] = descriptor
  return proxy as Reactive<T>
}

export default reactive
