import type { Typedef } from '../../utils'
import type { SuperProps } from './SuperProps'

/** _Props_-ы компонента */
export type Props<T extends SuperProps> = {
  [P in keyof T]: Typedef.JavaScript.TypesFromConstructors<T[P]>
}
