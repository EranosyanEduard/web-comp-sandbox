import type { Emitter } from './Emitter'

/** Контекст инициализации компонента */
export interface SetupOptions<EventType extends string> {
  element: HTMLElement
  emit: Emitter<EventType>
}
