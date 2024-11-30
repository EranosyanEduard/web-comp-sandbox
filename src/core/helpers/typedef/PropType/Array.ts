import type { AnyArray } from 'ts-essentials'

export type Array<T extends AnyArray> = ArrayConstructor & (() => T)
