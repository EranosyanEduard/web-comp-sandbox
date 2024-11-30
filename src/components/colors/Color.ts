import type { Dictionary } from 'ts-essentials'
import type { Color as IColor } from './typedef'

/** Цвет */
class Color implements IColor {
  static readonly Options = {
    PRIMARY: new Color('primary'),
    WHITE: new Color('white')
  } as const satisfies Dictionary<Color>

  readonly base: string
  readonly darken1: string
  readonly darken2: string
  readonly darken3: string
  readonly darken4: string
  readonly darken5: string
  readonly lighten1: string
  readonly lighten2: string
  readonly lighten3: string
  readonly lighten4: string
  readonly lighten5: string

  constructor(color: string) {
    this.base = `var(--v-color-${color}-base)`
    this.darken1 = `var(--v-color-${color}-darken-1)`
    this.darken2 = `var(--v-color-${color}-darken-2)`
    this.darken3 = `var(--v-color-${color}-darken-3)`
    this.darken4 = `var(--v-color-${color}-darken-4)`
    this.darken5 = `var(--v-color-${color}-darken-5)`
    this.lighten1 = `var(--v-color-${color}-lighten-1)`
    this.lighten2 = `var(--v-color-${color}-lighten-2)`
    this.lighten3 = `var(--v-color-${color}-lighten-3)`
    this.lighten4 = `var(--v-color-${color}-lighten-4)`
    this.lighten5 = `var(--v-color-${color}-lighten-5)`
  }
}

export default Color
