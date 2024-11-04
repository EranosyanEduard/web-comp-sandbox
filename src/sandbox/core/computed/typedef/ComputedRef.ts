import type { Opaque, Prettify } from 'ts-essentials'
import type { RefTypedef } from '../../ref'

/** Вычисляемое значение */
export type ComputedRef<T> = Prettify<
  Opaque<Pick<RefTypedef.Ref<T>, 'value'>, 'COMPUTED_REF'>
>
