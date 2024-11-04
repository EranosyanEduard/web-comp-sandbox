import type { CurrentInstanceTypedef } from '../../current_instance'

/** Мета информация о вычисляемом значении */
export interface ComputedMeta {
  components: Set<CurrentInstanceTypedef.CurrentInstance>
  isComputed: boolean
  subscribe: VoidFunction
}
