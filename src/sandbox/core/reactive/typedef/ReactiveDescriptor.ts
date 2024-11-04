import type { CurrentInstance } from '../../current_instance'

/** Мета информация о реактивном значении */
export interface ReactiveDescriptor {
  readonly components: Set<NonNullable<CurrentInstance>>
  readonly isReactive: boolean
  readonly isRef: boolean
}
