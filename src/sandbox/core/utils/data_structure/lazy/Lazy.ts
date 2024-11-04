import type { Utils } from '../../type'

/** Значение, вычисляющееся однажды */
class Lazy<T> {
  readonly value!: T

  constructor(lazyValue: Utils.LazyValue<T>) {
    const VOID = Symbol('VOID')
    let value: T | typeof VOID = VOID
    Reflect.defineProperty(this, 'value', {
      get: (): T => {
        if (value === VOID) value = lazyValue()
        return value
      }
    })
  }

  map<U>(fn: (value: T) => U): Lazy<U> {
    return new Lazy(() => fn(this.value))
  }
}

export default Lazy
