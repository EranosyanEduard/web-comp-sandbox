import type { Reactive_ } from '../../reactive'

/** Вычисляемое значение, доступное для чтения и записи */
export type ComputedRef<T> = Reactive_<{ value: T }, 'COMPUTED_REF'>
