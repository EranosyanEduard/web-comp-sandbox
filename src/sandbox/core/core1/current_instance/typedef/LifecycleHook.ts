import type { AnyFunction } from 'ts-essentials'

/** _Api_ подписки на хук жизненного цикла */
export type LifecycleHook = AnyFunction<[VoidFunction], void>
