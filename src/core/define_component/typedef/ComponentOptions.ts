import type { PropsOptions } from './PropsOptions'
import type { Setup } from './Setup'
import type { SuperProps } from './SuperProps'

/** Конфигурация компонента */
export interface ComponentOptions<
  Props extends SuperProps,
  EventType extends string
> {
  readonly name: string
  readonly emits?: EventType[]
  readonly props?: PropsOptions<Props>
  readonly setup: Setup<Props, EventType>
  readonly shadowRootConfig?: ShadowRootInit
}
