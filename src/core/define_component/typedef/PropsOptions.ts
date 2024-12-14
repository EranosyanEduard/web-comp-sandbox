import type { PropOptions } from '../../define_prop'
import type { SuperProps } from './SuperProps'

/** Конфигурация _props_-ов компонента */
export type PropsOptions<Props extends SuperProps> = {
  readonly [P in keyof Props]: PropOptions<Props[P]>
}
