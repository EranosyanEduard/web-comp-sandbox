import type { Predicate } from '../../helpers/typedef'
import type { LifecycleHook } from './LifecycleHook'

/** Контекст выполнения */
export interface Context {
  readonly containsContext: Predicate<Context>
  readonly requestRender: VoidFunction
  readonly whenDestroyed: LifecycleHook
  readonly whenMounted: LifecycleHook
  readonly whenRequestedRender: LifecycleHook
}
