import type { html } from 'lit-html'
import type { Accessor } from '../../helpers/typedef'
import type { Props } from './Props'
import type { SuperProps } from './SuperProps'

/** Инициализатор компонента */
export type Setup<T extends SuperProps> = (
  props: Readonly<Props<T>>
) => Accessor<ReturnType<typeof html>>['get']
