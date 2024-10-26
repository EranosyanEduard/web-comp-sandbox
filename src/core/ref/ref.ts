import { reactive, type ReactiveApi } from '../reactive'
import type { Ref } from './typedef'

/**
 * Сделать значение `value` реактивным.
 * @param value - произвольное значение
 */
function ref<T>(value: T): Ref<T> {
  const values = reactive({ value })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ref._store.set(values, reactive._store.get(values)!)
  // @ts-expect-error игнорировать ошибку типизации:
  // причина ошибки - не соответствие типа `Reactive<{ value: T }>`
  // типу `Ref<T>`.
  return values
}

ref._store = new WeakMap<object, ReactiveApi<object>>()

export default ref
