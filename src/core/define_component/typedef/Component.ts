import type { Context } from '../../current_context'

/** Компонент */
export interface Component extends Context {
  readonly attributeChangedCallback?: (
    name: string,
    prevValue: string | null,
    nextValue: string | null
  ) => void

  readonly connectedCallback?: VoidFunction

  readonly disconnectedCallback?: VoidFunction
}
