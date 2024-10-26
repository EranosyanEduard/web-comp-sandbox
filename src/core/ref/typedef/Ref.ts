import type { Opaque } from 'ts-essentials'

/** Частный случай реактивного значения */
export type Ref<T> = Opaque<{ value: T }, 'ref'>
