import _isEqual from 'lodash-es/isEqual'
import type { ComputedRef } from '../computed'
import { currentContext } from '../current_context'
import type { Reactive, Watcher } from '../reactive'
import type { Ref } from '../ref'
import type { WatchOptions, WatchSource } from './typedef'
import getWatchers from './get_watchers'
import unwrapWatchSource from './unwrap_watch_source'

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
  watchSource: WatchSource,
  watcher: Watcher<unknown>,
  watchOptions?: WatchOptions
): VoidFunction {
  const { deep = false, immediate = false, once = false } = watchOptions ?? {}
  const watchers = getWatchers(watchSource)
  const unwrap = unwrapWatchSource(watchSource)
  const _watcher: Watcher<object> = (next, prev) => {
    const values = unwrap({ next, prev })
    if (deep && _isEqual(values.next, values.prev)) return
    if (once) deleteWatcher()
    watcher(values.next, values.prev)
  }
  const deleteWatcher: VoidFunction = () => {
    watchers.delete(_watcher)
  }
  currentContext.get()?.whenDestroyed(deleteWatcher)
  watchers.add(_watcher)
  // @ts-expect-error При немедленном вызове нет предыдущего значения.
  if (immediate) _watcher(watchSource, null)
  return deleteWatcher
}

export default watch
