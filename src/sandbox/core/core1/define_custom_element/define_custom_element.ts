import _kebabCase from 'lodash-es/kebabCase'

/**
 * Определить _веб-компонент_, непосредственно используя _api_-браузера.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#registering_a_custom_element
 * @throws {DOMException} возникает, если название _веб-компонента_ или его
 * конструктор уже используются другим _веб-компонентом_
 * @throws {SyntaxError} возникает, если название _веб-компонента_ не
 * удовлетворяет [требованиям](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#valid_custom_element_names),
 * указанным в спецификации
 */
const defineCustomElement: typeof customElements.define = (
  name,
  Constructor,
  options
) => {
  customElements.define(_kebabCase(name), Constructor, options)
}

export default defineCustomElement
