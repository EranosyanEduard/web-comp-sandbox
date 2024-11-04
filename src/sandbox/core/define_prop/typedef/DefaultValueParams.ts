import type { Prettify, Merge } from 'ts-essentials'
import type { PropOptions } from './PropOptions'
import type { RuntimeType } from './RuntimeType'

/** Конфигурация значения _props_-а по умолчанию */
export type DefaultValueParams<T extends RuntimeType> = Prettify<
  Merge<Pick<PropOptions<T>, 'default' | 'required'>, { name: string }>
>
