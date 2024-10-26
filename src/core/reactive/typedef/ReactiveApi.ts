import type { AnyFunction } from 'ts-essentials'
import type { CurrentContext } from '../../current_context'
import type { Watcher } from './Watcher'

/** _Api_ для управления реактивным значением */
export interface ReactiveApi<T> {
  readonly addContext: AnyFunction<[CurrentContext], void>
  readonly watch: AnyFunction<[Watcher<T>], VoidFunction>
}
