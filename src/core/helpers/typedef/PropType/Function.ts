import type { AnyFunction } from 'ts-essentials'

export type Function<T extends AnyFunction> = BooleanConstructor & (() => T)
