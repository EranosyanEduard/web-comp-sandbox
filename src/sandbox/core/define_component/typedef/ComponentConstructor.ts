/** Конструктор компонента */
export interface ComponentConstructor extends CustomElementConstructor {
  readonly observedAttributes?: string[]
}
