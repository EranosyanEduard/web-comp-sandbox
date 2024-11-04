import type { AnyFunction } from 'ts-essentials'

/** Хранилище вычисляемых значений */
export interface ComputedStore {
  readonly evaluate: VoidFunction

  readonly subscribe: AnyFunction<VoidFunction[], void>
}
