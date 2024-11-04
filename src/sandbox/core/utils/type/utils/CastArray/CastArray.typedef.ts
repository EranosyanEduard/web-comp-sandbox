import type { AnyArray } from 'ts-essentials'

/** Привести тип `T` к кортежу */
export type CastArray<T> = T extends AnyArray ? T : [T]
