import type { Opaque } from 'ts-essentials'

/** Создать уникальное реактивное значение */
export type Reactive_<T extends object, K extends string> = Opaque<T, K>
