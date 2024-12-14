/**
 * _Nullable_-значение.
 * @since 1.0.0
 * @version 1.0.0
 * @example
 * function getOrNull(numbers: number[], index: number): Maybe<number> {
 *   return numbers[index] ?? null
 * }
 */
export type Maybe<T> = T | null
