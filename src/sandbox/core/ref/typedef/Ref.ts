import type { Opaque, Prettify } from 'ts-essentials'
import type { ReactiveTypedef } from '../../reactive'

/** Частный случай реактивного значения */
export type Ref<T> = Prettify<
  Opaque<Pick<ReactiveTypedef.Reactive<{ value: T }>, 'value'>, 'REF'>
>
