import type { Reactive_ } from '../../reactive'

/** Частный случай реактивного значения */
export type Ref<T> = Reactive_<{ value: T }, 'REF'>
