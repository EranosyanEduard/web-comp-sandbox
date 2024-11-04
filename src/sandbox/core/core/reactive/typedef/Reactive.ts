import type { Opaque } from 'ts-essentials'

/** Реактивное значение */
export type Reactive<T extends object> = Opaque<T, 'reactive'>
