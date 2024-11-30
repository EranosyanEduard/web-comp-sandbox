export type Number<T extends number> = NumberConstructor & (() => T)
