export type Object<T extends object> = ObjectConstructor & (() => T)
