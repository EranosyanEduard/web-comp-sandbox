export type Boolean<T extends boolean> = BooleanConstructor & (() => T)
