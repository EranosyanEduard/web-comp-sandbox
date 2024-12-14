export type String<T extends string = string> = StringConstructor & (() => T)
