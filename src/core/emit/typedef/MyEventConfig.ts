export interface MyEventConfig<Payload, EventType extends string> {
  readonly eventInit?: EventInit
  readonly payload?: Payload
  readonly type: EventType
}
