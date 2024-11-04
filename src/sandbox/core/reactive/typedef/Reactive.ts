import type { Opaque } from 'ts-essentials'
import type { REACTIVE_DESCRIPTOR_UNIQUE_SYMBOL } from '../constants'
import type { ReactiveDescriptor } from './ReactiveDescriptor'

/** Реактивное значение */
export type Reactive<T extends object> = Opaque<T, 'REACTIVE'> & {
  readonly [REACTIVE_DESCRIPTOR_UNIQUE_SYMBOL]: ReactiveDescriptor
}
