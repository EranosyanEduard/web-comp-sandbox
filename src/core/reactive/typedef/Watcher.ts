import type { AnyFunction } from 'ts-essentials'
import type { WatcherParams } from './WatcherParams'

/** Наблюдатель за значением */
export type Watcher<T extends object, V extends T[keyof T]> = AnyFunction<
  [WatcherParams<V>],
  void
>
