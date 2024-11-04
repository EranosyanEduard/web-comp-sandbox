import type { PropOptions } from './PropOptions'
import type { RuntimeType } from './RuntimeType'

/** Конфигурация валидатора значения _props_-а */
export type ValidatorParams<T extends RuntimeType> = Pick<
  PropOptions<T>,
  'type' | 'validator'
>
