import type { ValueOf } from 'ts-essentials'
import type { OnChange } from './OnChange'

/** _Api_ для управления реактивным значением */
export interface ReactiveApi<T extends object> {
  readonly whenChanged: (onchange: OnChange<ValueOf<T>>) => VoidFunction
}
