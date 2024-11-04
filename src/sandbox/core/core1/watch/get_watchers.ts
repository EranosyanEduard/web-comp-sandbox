import { isComputedRef, COMPUTED_UNIQUE_SYMBOL } from '../computed'
import { ArgumentError } from '../helpers/error'
import type { Maybe } from '../helpers/typedef'
import {
  isReactive,
  REACTIVE_UNIQUE_SYMBOL,
  type ReactiveApi
} from '../reactive'
import { isRef, REF_UNIQUE_SYMBOL } from '../ref'

/**
 * Найти хранилище наблюдателей.
 * @param watchSource - цель наблюдения
 * @throws {ArgumentError} аргумент `watchSource` не является вычисляемым
 * или реактивным значением
 */
function getWatchers(
  watchSource: object
): Pick<ReactiveApi['watchers'], 'add' | 'delete'> {
  let reactiveApi: Maybe<ReactiveApi> = null
  if (isComputedRef(watchSource)) {
    reactiveApi = watchSource[COMPUTED_UNIQUE_SYMBOL]
  } else if (isRef(watchSource)) {
    reactiveApi = watchSource[REF_UNIQUE_SYMBOL]
  } else if (isReactive(watchSource)) {
    reactiveApi = watchSource[REACTIVE_UNIQUE_SYMBOL]
  }
  if (reactiveApi !== null) return reactiveApi.watchers
  throw new ArgumentError({
    argument: 'watchSource',
    functionName: 'watch'
  })
}

export default getWatchers
