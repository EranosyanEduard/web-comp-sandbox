import { reactive, type ReactiveApi } from '../reactive'
import type { Ref } from './typedef'

/**
 * Сделать значение `value` реактивным.
 * @param value - произвольное значение
 */
function ref<T>(value: T): Ref<T> {
  const values = reactive({ value })
  // @ts-expect-error Игнорировать ошибку типизации.
  ref.store.set(values, reactive.store.get(values))
  // @ts-expect-error Игнорировать ошибку типизации.
  return values
}

ref.store = new WeakMap<object, ReactiveApi>()

export default ref
