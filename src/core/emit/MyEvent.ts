import type { MyEvent as IMyEvent, MyEventConfig } from './typedef'

class MyEvent<Payload> extends Event implements IMyEvent<Payload> {
  readonly payload: Payload | undefined

  constructor(config: MyEventConfig<Payload, string>) {
    const { eventInit, payload, type } = config
    super(type, eventInit)
    this.payload = payload
  }
}

export default MyEvent
