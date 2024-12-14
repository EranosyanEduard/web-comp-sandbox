import type { Accessor } from '../helpers/typedef'
import type { CurrentContext } from './typedef'

let _currentContext: CurrentContext = null
/** _API_ для управления контекстом выполнения */
const currentContext: Accessor<CurrentContext> = {
  get: () => _currentContext,
  set: (context) => {
    _currentContext = context
  }
}

export default currentContext
