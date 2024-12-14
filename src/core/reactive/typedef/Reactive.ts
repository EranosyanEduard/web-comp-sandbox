import type { Reactive_ } from './Reactive_'

/** Реактивное значение */
export type Reactive<T extends object> = Reactive_<T, 'REACTIVE'>
