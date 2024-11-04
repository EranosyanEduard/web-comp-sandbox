import type { CurrentInstance, CurrentInstanceProxy } from './typedef'

/** Инициализируемый экземпляр компонента */
let _currentInstance: CurrentInstance = null
/** _API_ для чтения и записи инициализируемого экземпляра компонента */
const currentInstance: CurrentInstanceProxy = {
  get: () => _currentInstance,
  set: (instance) => {
    _currentInstance = instance
  }
}

export default currentInstance
