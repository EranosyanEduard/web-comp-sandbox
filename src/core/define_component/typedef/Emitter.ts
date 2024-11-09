import type { AnyFunction } from 'ts-essentials'
import type { MyEventConfig } from '../../emit'

export type Emitter<EventType extends string> = AnyFunction<
  [MyEventConfig<unknown, EventType>],
  void
>
