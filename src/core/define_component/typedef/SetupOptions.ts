import type { EventConfig } from './EventConfig'

/** Контекст инициализации компонента */
export interface SetupOptions<EventType extends string> {
  element: HTMLElement
  emit: ((eventType: EventType) => void) &
    (<T>(eventType: EventType, detail: T) => void) &
    (<T>(eventConfig: EventConfig<EventType, T>) => void)
}
