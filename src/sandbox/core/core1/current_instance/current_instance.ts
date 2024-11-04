import type { Accessor } from '../helpers/typedef'
import type { CurrentInstance } from './typedef'

/** Инициализируемый экземпляр компонента */
let currentInstance: CurrentInstance = null
/** _API_ для чтения и записи инициализируемого экземпляра компонента */
const accessor: Accessor<CurrentInstance> = {
  get() {
    return currentInstance
  },
  set(instance) {
    currentInstance = instance
  }
}

export default accessor
