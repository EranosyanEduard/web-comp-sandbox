/** Конфигурация пользовательского события */
export interface EventConfig<EventType extends string, Payload> {
  readonly eventInit?: CustomEventInit<Payload>
  readonly type: EventType
}
