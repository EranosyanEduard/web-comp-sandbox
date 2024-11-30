export type String<T extends string> = StringConstructor & (() => T)
