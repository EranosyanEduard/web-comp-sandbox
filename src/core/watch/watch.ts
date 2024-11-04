import _isEqual from 'lodash-es/isEqual'
import type { ComputedRef } from '../computed'
import { currentContext } from '../current_context'
import type { Reactive, OnChange as ReactiveWatcher } from '../reactive'
import type { Ref } from '../ref'
import type { Watcher, WatchOptions, WatchSource } from './typedef'
import getWatchers from './get_watchers'
import unwrapWatchSource from './unwrap_watch_source'

/**
 * Определить функцию-наблюдатель.
 * @param watchSource - реактивный объект
 * @param watcher - функция, которая будет вызвана при изменении значения цели
 * наблюдения
 * @param watchOptions - конфигурация наблюдения
 * @throws {ArgumentError} см. {@link getWatchers}
 * @since 1.0.0
 * @version 1.0.0
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
 * @since 1.0.0
 * @version 1.0.0
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
  const addWatcher = getWatchers(watchSource)
  const unwrap = unwrapWatchSource(watchSource)
  const watcher_: ReactiveWatcher<unknown> = (options) => {
    const { nextValue, prevValue } = unwrap(options)
    if (deep && _isEqual(nextValue, prevValue)) return
    if (once) deleteWatcher()
    void watcher(nextValue, prevValue)
  }
  const deleteWatcher = addWatcher(watcher_)
  currentContext.get()?.whenDestroyed(deleteWatcher)
  if (immediate) {
    // @ts-expect-error игнорировать ошибку типизации:
    // функция `watcher_` корректно извлечёт значения из источника для
    // наблюдателя.
    watcher_({ nextValue: watchSource.value, prevValue: null })
  }
  return deleteWatcher
}

export default watch
