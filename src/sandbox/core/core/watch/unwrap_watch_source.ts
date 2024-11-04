import _identity from 'lodash-es/identity'
import type { AnyFunction } from 'ts-essentials'
import { isComputedRef } from '../computed'
import { ArgumentError } from '../helpers/error'
import { isReactive } from '../reactive'
import { isRef } from '../ref'
import type { ValuesHistory, WatchSource } from './typedef'

/**
 * Распаковать историю значений.
 * @param watchSource - цель наблюдения
 * @throws {ArgumentError} аргумент `watchSource` не является вычисляемым
 * или реактивным значением
 */
function unwrapWatchSource(
  watchSource: WatchSource
): AnyFunction<[ValuesHistory<object>], ValuesHistory<unknown>> {
  if (isComputedRef(watchSource) || isRef(watchSource)) {
    // @ts-expect-error Аргумент - ValuesHistory<ComputedRef<unknown>| Ref<unknown>>.
    return ({ next, prev }) => ({ next: next.value, prev: prev.value })
  }
  if (isReactive(watchSource)) return _identity
  throw new ArgumentError({
    argument: 'watchSource',
    functionName: 'watch'
  })
}

export default unwrapWatchSource
