import { isComputedRef, computed } from '../computed'
import { ArgumentError } from '../helpers/error'
import type { Maybe } from '../helpers/typedef'
import { isReactive, reactive, type ReactiveApi } from '../reactive'
import { isRef, ref } from '../ref'
import type { WatchSource } from './typedef'

/**
 * Найти хранилище наблюдателей.
 * @param watchSource - цель наблюдения
 * @throws {ArgumentError} аргумент `watchSource` не является вычисляемым
 * или реактивным значением
 */
function getWatchers(
  watchSource: WatchSource
): ReactiveApi<object>['whenChanged'] {
  let api: Maybe<typeof computed | typeof reactive | typeof ref> = null
  if (isComputedRef(watchSource)) {
    api = computed
  } else if (isRef(watchSource)) {
    api = ref
  } else if (isReactive(watchSource)) {
    api = reactive
  }
  const { whenChanged = null } = api?._INSTANCES.get(watchSource) ?? {}
  if (whenChanged === null) {
    throw new ArgumentError({
      argument: 'watchSource',
      functionName: 'watch'
    })
  }
  return whenChanged
}

export default getWatchers
