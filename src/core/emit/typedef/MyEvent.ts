export interface MyEvent<Payload> extends Event {
  readonly payload?: Payload
}
