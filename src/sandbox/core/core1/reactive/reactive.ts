import { accessor } from '../current_instance'
import Reactive from './Reactive.impl'

/**
 * Создать реактивное значение.
 * @param values - произвольный объект
 */
function reactive<T extends object>(values: T): T {
  const reactiveValues = new Reactive(values)
  reactiveValues.updateInstances(accessor.get())
  return reactiveValues.values
}

export default reactive
