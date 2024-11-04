import _isEqual from 'lodash-es/isEqual'
import type { ComputedRef } from '../computed'
import { accessor } from '../current_instance'
import type { Reactive } from '../reactive'
import type { Ref } from '../ref'
import type { Watcher, WatchOptions } from './typedef'
import getWatchers from './get_watchers'
import unwrapHistoryValues from './unwrap_history_values'

/**
 * Определить функцию-наблюдатель.
 * @param watchSource - реактивный объект
 * @param watcher - функция, которая будет вызвана при изменении значения цели
 * наблюдения
 * @param watchOptions - конфигурация наблюдения
 * @throws {ArgumentError} см. {@link getWatchers}
 */
function watch<T extends object>(
  watchSource: Reactive<T>,
  watcher: Watcher<T>,
  watchOptions?: WatchOptions
): VoidFunction

/**
 * Определить функцию-наблюдатель.
 * @param watchSource - вычисляемое или реактивное значение
 * @param watcher - функция, которая будет вызвана при изменении значения цели
 * наблюдения
 * @param watchOptions - конфигурация наблюдения
 * @throws {ArgumentError} см. {@link getWatchers}
 */
function watch<T>(
  watchSource: ComputedRef<T> | Readonly<ComputedRef<T>> | Ref<T>,
  watcher: Watcher<T>,
  watchOptions?: WatchOptions
): VoidFunction

function watch(
  watchSource:
    | ComputedRef<unknown>
    | Readonly<ComputedRef<unknown>>
    | Reactive<object>
    | Ref<unknown>,
  watcher: Watcher<unknown>,
  watchOptions?: WatchOptions
): VoidFunction {
  const { deep = false, immediate = false, once = false } = watchOptions ?? {}
  const watchers = getWatchers(watchSource)
  const unwrap = unwrapHistoryValues(watchSource)
  const _watcher: Watcher<unknown> = (next, prev) => {
    const values = unwrap({ next, prev })
    if (deep && _isEqual(values.next, values.prev)) return
    if (once) deleteWatcher()
    watcher(values.next, values.prev)
  }
  const deleteWatcher: VoidFunction = () => {
    watchers.delete(_watcher)
  }
  accessor.get()?.whenDestroyed(deleteWatcher)
  watchers.add(_watcher)
  if (immediate) _watcher(watchSource, null)
  return deleteWatcher
}

export default watch
