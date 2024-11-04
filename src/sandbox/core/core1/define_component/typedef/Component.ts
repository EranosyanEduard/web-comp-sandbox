import type { ComputedStore } from './ComputedStore'

/** Компонент */
export interface Component extends HTMLElement {
  readonly attributeChangedCallback?: (
    name: string,
    prevValue: string | null,
    nextValue: string | null
  ) => void

  readonly computedStore: Pick<ComputedStore, 'subscribe'>

  readonly connectedCallback?: VoidFunction

  readonly requestRender: VoidFunction
}
