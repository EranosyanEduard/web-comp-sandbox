import type { CurrentContext } from '../../current_context'
import type { Accessor } from '../../helpers/typedef'

/** _API_ для инъекции зависимостей */
export interface DependencyInjection<T> {
  readonly inject: (
    key: symbol,
    context: CurrentContext,
    value: Accessor<T>['get']
  ) => T

  readonly provide: (
    key: symbol,
    context: CurrentContext,
    value: Accessor<T>['get']
  ) => void
}
