import _cloneDeep from 'lodash-es/cloneDeep'
import type { CurrentInstance, Instance } from '../current_instance'
import type { Watcher } from '../watch'

class Reactive<T extends object> {
  static readonly store = new WeakMap<object, Reactive<object>>()

  readonly #instances = new Set<Instance>()

  readonly #watchers = new Set<Watcher<object>>()

  constructor(readonly values: T) {
    this.values = this.#defineReactive(values)
  }

  updateInstances(...instances: CurrentInstance[]): void {
    instances.forEach((it) => {
      if (it === null || this.#instances.has(it)) return
      this.#instances.add(it)
      it.whenDestroyed(() => {
        this.#instances.delete(it)
      })
    })
  }

  #defineReactive(values: T): T {
    const proxy = new Proxy(values, {
      set: (target, key, value) => {
        const keyAs = key as keyof T
        const prevValue = target[keyAs]
        if (prevValue !== value) {
          const oldTarget = _cloneDeep(target)
          target[keyAs] = value
          this.#instances.forEach((it) => {
            it.requestRender()
          })
          this.#watchers.forEach((it) => {
            it(target, oldTarget)
          })
        }
        return true
      }
    })
    Reactive.store.set(proxy, this)
    return proxy
  }
}

export default Reactive
