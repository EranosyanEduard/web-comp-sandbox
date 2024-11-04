import type { Opaque, Prettify } from 'ts-essentials'
import type { ReactiveApi } from '../../reactive'
import type { Ref } from '../../ref'
import type { COMPUTED_UNIQUE_SYMBOL } from '../constants'

/** Вычисляемое значение */
export type ComputedRef<T> = Prettify<
  Opaque<Pick<Ref<T>, 'value'>, 'computed_ref'> & {
    [COMPUTED_UNIQUE_SYMBOL]: ReactiveApi
  }
>
