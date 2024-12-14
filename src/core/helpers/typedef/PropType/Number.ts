export type Number<T extends number = number> = NumberConstructor & (() => T)
