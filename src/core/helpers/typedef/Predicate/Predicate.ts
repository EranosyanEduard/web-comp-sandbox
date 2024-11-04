/**
 * Функция-предикат.
 * @since 1.0.0
 * @version 1.0.0
 * @example
 * const isEmpty = (s: string) => s.length === 0
 */
export type Predicate<T> = (value: T) => boolean
