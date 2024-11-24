import type { Predicate } from '../helpers/typedef'
import type { Context as IContext, WhenCallbacks } from './typedef'

/** Класс, представляющий контекст выполнения */
class Context implements IContext {
  readonly containsContext: Predicate<IContext>
  readonly #whenCallbacks: WhenCallbacks = {
    whenDestroyed: new Set(),
    whenMounted: new Set(),
    whenRequestedRender: new Set()
  }

  constructor(options: Pick<IContext, 'containsContext'>) {
    const { containsContext } = options
    this.containsContext = containsContext
  }

  destroy(): void {
    this.#callWhenCallbacks('whenDestroyed')
  }

  mount(): void {
    this.#callWhenCallbacks('whenMounted')
  }

  requestRender(): void {
    this.#callWhenCallbacks('whenRequestedRender')
  }

  whenDestroyed(cb: VoidFunction): void {
    this.#addWhenCallback('whenDestroyed', cb)
  }

  whenMounted(cb: VoidFunction): void {
    this.#addWhenCallback('whenMounted', cb)
  }

  whenRequestedRender(cb: VoidFunction): void {
    this.#addWhenCallback('whenRequestedRender', cb)
  }

  #addWhenCallback(key: keyof WhenCallbacks, cb: VoidFunction): void {
    this.#whenCallbacks[key].add(cb)
  }

  #callWhenCallbacks(key: keyof WhenCallbacks): void {
    this.#whenCallbacks[key].forEach((cb) => {
      cb()
    })
  }
}

export default Context
