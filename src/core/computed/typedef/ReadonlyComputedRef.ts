import type { ComputedRef } from './ComputedRef'

/** Вычисляемое значение, доступное только для чтения */
export type ReadonlyComputedRef<T> = Readonly<ComputedRef<T>>
