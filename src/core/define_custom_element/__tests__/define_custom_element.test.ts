import _kebabCase from 'lodash-es/kebabCase'
import _uniqueId from 'lodash-es/uniqueId'
import { describe, expect, it } from 'vitest'
import defineCustomElement from '../define_custom_element'

describe('тестовый набор функции `defineCustomElement`', () => {
  it('должен определить компонент', () => {
    expect.hasAssertions()

    const Component = class extends HTMLElement {}
    const componentName = _uniqueId('test-component-')
    defineCustomElement(componentName, Component)

    expect(customElements.get(componentName)).toBe(Component)
  })

  it('должен преобразовать название компонента в `kebab-case`', () => {
    expect.hasAssertions()

    const Component = class extends HTMLElement {}
    const componentName = _uniqueId('TestComponent')
    defineCustomElement(componentName, Component)

    expect(customElements.get(componentName)).toBeUndefined()
    expect(customElements.get(_kebabCase(componentName))).toBe(Component)
  })

  it('должен выбросить исключение, если компонент с таким названием уже определён', () => {
    expect.hasAssertions()

    expect(() => {
      defineCustomElement('TestComponent', class extends HTMLElement {})
      defineCustomElement('TestComponent', class extends HTMLElement {})
    }).toThrow()
  })

  it('должен выбросить исключение, если компонент c таким конструктором уже определён', () => {
    expect.hasAssertions()

    const Component = class extends HTMLElement {}

    expect(() => {
      defineCustomElement(_uniqueId('TestComponent'), Component)
      defineCustomElement(_uniqueId('TestComponent'), Component)
    }).toThrow()
  })

  it.each(['', ' ', 'single'])(
    'должен выбросить исключение, если название компонента ("%s") не соответствует требованиям спецификации',
    (componentName) => {
      expect.hasAssertions()

      expect(() => {
        defineCustomElement(componentName, class extends HTMLElement {})
      }).toThrow()
    }
  )
})
