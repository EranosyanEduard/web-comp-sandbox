import type { html } from 'lit-html'
import type { Accessor } from '../../helpers/typedef'
import type { Props } from './Props'
import type { SetupOptions } from './SetupOptions'
import type { SuperProps } from './SuperProps'

/** Инициализатор компонента */
export type Setup<PropsDef extends SuperProps, EventType extends string> = (
  props: Readonly<Props<PropsDef>>,
  context: SetupOptions<EventType>
) => Accessor<ReturnType<typeof html>>['get']
