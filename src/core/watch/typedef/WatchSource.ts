import type { ComputedRef, ReadonlyComputedRef } from '../../computed'
import type { Reactive } from '../../reactive'
import type { Ref } from '../../ref'

/** Цель наблюдения */
export type WatchSource =
  | ComputedRef<unknown>
  | ReadonlyComputedRef<unknown>
  | Reactive<object>
  | Ref<unknown>
