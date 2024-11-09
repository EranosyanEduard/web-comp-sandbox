import type { AnyArray } from 'ts-essentials'

/**
 * Привести тип `T` к кортежу.
 * @since 1.0.0
 * @version 1.0.0
 * @example
 * function toArray<T>(value: T): CastArray<T> {
 *   return Array.isArray(value) ? value : [value]
 * }
 */
export type CastArray<T> = T extends AnyArray ? T : [T]
