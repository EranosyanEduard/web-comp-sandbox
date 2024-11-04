import _identity from 'lodash-es/identity'
import type { AnyFunction } from 'ts-essentials'
import { isComputedRef } from '../computed'
import { ArgumentError } from '../helpers/error'
import { isReactive, type OnChangeParams } from '../reactive'
import { isRef } from '../ref'
import type { WatchSource } from './typedef'

/**
 * Распаковать историю значений.
 * @param watchSource - цель наблюдения
 * @throws {ArgumentError} аргумент `watchSource` не является вычисляемым
 * или реактивным значением
 */
function unwrapWatchSource(
  watchSource: WatchSource
): AnyFunction<[OnChangeParams<unknown>], OnChangeParams<unknown>> {
  if (isComputedRef(watchSource) || isRef(watchSource)) {
    return _identity
  }
  if (isReactive(watchSource)) {
    return () => ({ nextValue: watchSource, prevValue: watchSource })
  }
  throw new ArgumentError({
    argument: 'watchSource',
    functionName: 'watch'
  })
}

export default unwrapWatchSource
