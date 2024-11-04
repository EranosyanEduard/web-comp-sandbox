import type { CurrentInstance } from './CurrentInstance'

/** Интерфейс для управления текущим компонентом */
export interface CurrentInstanceProxy {
  readonly get: () => CurrentInstance
  readonly set: (instance: CurrentInstance) => void
}
