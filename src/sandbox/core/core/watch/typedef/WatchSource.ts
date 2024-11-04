import type { ComputedRef } from '../../computed'
import type { Reactive } from '../../reactive'
import type { Ref } from '../../ref'

/** Цель наблюдения */
export type WatchSource =
  | ComputedRef<unknown>
  | Readonly<ComputedRef<unknown>>
  | Reactive<object>
  | Ref<unknown>
