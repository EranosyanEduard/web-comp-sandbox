import { type ComputedRef, isComputedRef } from '../computed'
import { ArgumentError } from '../helpers/error'
import { isReactive, type Reactive } from '../reactive'
import { isRef, type Ref } from '../ref'
import type { ValuesHistory } from './typedef'

function reactiveValues<T extends object>(
  values: ValuesHistory<Reactive<T>>
): ValuesHistory<T> {
  return values
}

function refValues<T>(
  values: ValuesHistory<Readonly<ComputedRef<T>> | Ref<T>>
): ValuesHistory<T> {
  return {
    next: values.next.value,
    prev: values.prev.value
  }
}

function unwrapHistoryValues<T extends object>(
  watchSource: Reactive<T>
): typeof reactiveValues<T>
function unwrapHistoryValues<T>(
  watchSource: Readonly<ComputedRef<T>> | Ref<T>
): typeof refValues<T>

/**
 * Распаковать историю значений.
 * @param watchSource - цель наблюдения
 * @throws {ArgumentError} аргумент `watchSource` не является вычисляемым
 * или реактивным значением
 */
function unwrapHistoryValues(
  watchSource: Readonly<ComputedRef<unknown>> | Reactive<object> | Ref<unknown>
): typeof reactiveValues | typeof refValues {
  if (isComputedRef(watchSource) || isRef(watchSource)) return refValues
  if (isReactive(watchSource)) return reactiveValues
  throw new ArgumentError({
    argument: 'watchSource',
    functionName: 'watch'
  })
}

export default unwrapHistoryValues
