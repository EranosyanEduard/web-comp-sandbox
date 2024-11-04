import { reactive, type ReactiveApi } from '../reactive'
import type { Ref } from './typedef'

const INSTANCES = new WeakMap<object, ReactiveApi<object>>()

/**
 * Сделать значение `value` реактивным.
 * @param value - произвольное значение
 */
function ref<T>(value: T): Ref<T> {
  const values = reactive({ value })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  INSTANCES.set(values, reactive._INSTANCES.get(values)!)
  // @ts-expect-error игнорировать ошибку типизации:
  // преобразовать тип `Reactive` в тип `Ref`.
  return values
}

ref._INSTANCES = INSTANCES as Pick<typeof INSTANCES, 'get' | 'has'>

export default ref
