export type Object<T extends object = object> = ObjectConstructor & (() => T)
