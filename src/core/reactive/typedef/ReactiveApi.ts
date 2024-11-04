import type { AnyFunction } from 'ts-essentials'
import type { Watcher } from './Watcher'

/** _Api_ для управления реактивным значением */
export interface ReactiveApi<T extends object> {
  readonly whenChanged: AnyFunction<[Watcher<T, T[keyof T]>], VoidFunction>
}
