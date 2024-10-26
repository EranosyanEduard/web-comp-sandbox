import type { Opaque } from 'ts-essentials'

/** Вычисляемое значение, доступное для чтения и записи */
export type ComputedRef<T> = Opaque<{ value: T }, 'computed_ref'>
