import type { Prettify } from 'ts-essentials'
import type { PropOptions } from './PropOptions'
import type { RuntimeType } from './RuntimeType'

/** Обработанная конфигурация _props_-а */
export type ProcessedPropOptions<T extends RuntimeType> = Prettify<Go<T>>

type Go<
  T extends RuntimeType,
  U extends PropOptions<T> = PropOptions<T>
> = Pick<U, 'reflector'> & Required<Pick<U, 'default' | 'validator'>>
