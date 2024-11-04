import type { Predicate } from '../../helpers/typedef'
import type { LifecycleHook } from './LifecycleHook'

/** Контекст выполнения */
export interface Instance {
  readonly containsInstance: Predicate<Instance>
  readonly requestRender: VoidFunction
  readonly whenDestroyed: LifecycleHook
  readonly whenMounted: LifecycleHook
  readonly whenRequestedRender: LifecycleHook
}
