import type { Dictionary } from 'ts-essentials'

/** Размер */
class Size<T extends string> {
  static readonly Options = {
    XS: new Size('xs'),
    SM: new Size('sm'),
    MD: new Size('md'),
    LG: new Size('lg'),
    XL: new Size('xl')
  } as const satisfies Dictionary<Size<string>>

  constructor(private readonly value: T) {}

  toString(): T {
    return this.value
  }
}

export default Size
