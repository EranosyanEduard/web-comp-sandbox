/**
 * Свойство доступа.
 * @since 1.0.0
 * @version 1.0.0
 * @example
 * interface Context {
 *   readonly use: VoidFunction
 * }
 *
 * const context: Context | null = null
 * const accessor: Accessor<Context | null> = {
 *   get: () => context,
 *   set: (value) => {
 *     context = value
 *   }
 * }
 */
export interface Accessor<T> {
  readonly get: () => T
  readonly set: (value: T) => void
}
