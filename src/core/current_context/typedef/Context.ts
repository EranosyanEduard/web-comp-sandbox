import type { Predicate } from '../../helpers/typedef'
import type { When } from './When'

/** Контекст выполнения */
export interface Context {
  readonly containsContext: Predicate<Context>
  readonly requestRender: VoidFunction
  readonly whenDestroyed: When
  readonly whenMounted: When
  readonly whenRequestedRender: When
}
