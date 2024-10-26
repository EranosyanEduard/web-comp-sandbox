import type { AnyFunction } from 'ts-essentials'

/** _Api_ подписки на хук жизненного цикла контекста выполнения */
export type When = AnyFunction<[VoidFunction], void>
