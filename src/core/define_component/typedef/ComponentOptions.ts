import type { PropsOptions } from './PropsOptions'
import type { Setup } from './Setup'
import type { SuperProps } from './SuperProps'

/** Конфигурация компонента */
export interface ComponentOptions<Props extends SuperProps> {
  readonly name: string
  readonly props?: PropsOptions<Props>
  readonly setup: Setup<Props>
}
