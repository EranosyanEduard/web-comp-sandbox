import type { html } from 'lit-html'
import type { Typedef } from '../../utils'
import type { Props } from './Props'
import type { SuperProps } from './SuperProps'

/** Инициализатор компонента */
export type Setup<T extends SuperProps> = (
  props: Readonly<Props<T>>
) => Typedef.Utils.LazyValue<ReturnType<typeof html>>
