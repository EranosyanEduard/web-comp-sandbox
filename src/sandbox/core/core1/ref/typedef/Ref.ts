import type { Opaque, Prettify } from 'ts-essentials'
import type { Reactive, ReactiveApi } from '../../reactive'
import type { REF_UNIQUE_SYMBOL } from '../constants'

/** Частный случай реактивного значения */
export type Ref<T> = Prettify<
  Opaque<Pick<Reactive<{ value: T }>, 'value'>, 'ref'> & {
    [REF_UNIQUE_SYMBOL]: ReactiveApi
  }
>
