import type { TypesFromConstructors } from '../../helpers/typedef'
import type { SuperProps } from './SuperProps'

/** _Props_-ы компонента */
export type Props<T extends SuperProps> = {
  [P in keyof T]: TypesFromConstructors<T[P]>
}
