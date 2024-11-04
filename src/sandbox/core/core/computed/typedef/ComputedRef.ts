import type { Opaque } from 'ts-essentials'

/** Вычисляемое значение */
export type ComputedRef<T> = Opaque<{ value: T }, 'computed_ref'>
