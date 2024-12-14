import type { AnyArray } from 'ts-essentials'

export type Array<T extends AnyArray = readonly unknown[]> = ArrayConstructor &
  (() => T)
