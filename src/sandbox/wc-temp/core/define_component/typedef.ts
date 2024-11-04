import type { Dictionary } from 'ts-essentials'
import type { DefinePropTypedef } from '../define_props'
import type { type } from '../utils'

/** Конструктор компонента */
export interface ComponentConstructor extends CustomElementConstructor {
  readonly observedAttributes: string[]
}

/** Конфигурация _компонента_ */
export interface ComponentOptions<Props extends SuperProps> {
  readonly name: string
  readonly setup: Setup<Props>
  readonly props?: PropsOptions<Props>
}

/** Конфигурация _props_-ов _компонента_ */
export type PropsOptions<Props extends SuperProps> = {
  readonly [P in keyof Props]: DefinePropTypedef.PropOptions<Props[P]>
}

export type SuperProps = Dictionary<DefinePropTypedef.RuntimeType>

type Setup<Props extends SuperProps> = (
  props: Readonly<PropsConfigs<Props>>
) => void

export type PropsConfigs<Props extends SuperProps> = {
  [P in keyof Props]: type.js.TypesFromConstructors<Props[P]>
}
