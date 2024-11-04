import type { AnyFunction } from 'ts-essentials'
import type { CurrentContext } from '../../current_context'
import type { Watcher } from './Watcher'

/** _Api_ для управления реактивным значением */
export interface ReactiveApi {
  readonly useContext: AnyFunction<CurrentContext[], void>
  readonly watchers: Pick<Set<Watcher<object>>, 'add' | 'delete'>
}
