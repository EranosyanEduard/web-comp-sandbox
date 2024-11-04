import _kebabCase from 'lodash-es/kebabCase'
import _uniqueId from 'lodash-es/uniqueId'
import { describe, expect, it } from 'vitest'
import defineCustomElement from '../define_custom_element'

describe('тестовый набор функции `defineCustomElement`', () => {
  it('должен определить компонент', () => {
    expect.hasAssertions()

    const Component = class extends HTMLElement {}
    const name = _kebabCase(_uniqueId('TestComponent'))
    defineCustomElement(name, Component)

    expect(customElements.get(name)).toBe(Component)
  })

  it('должен преобразовать название компонента в `kebab-case`', () => {
    expect.hasAssertions()

    const Component = class extends HTMLElement {}
    const name = _uniqueId('TestComponent')
    defineCustomElement(name, Component)

    expect(customElements.get(name)).toBeUndefined()
    expect(customElements.get(_kebabCase(name))).toBe(Component)
  })

  it('должен выбросить исключение, если компонент с таким названием уже определён', () => {
    expect.hasAssertions()

    const ComponentA = class extends HTMLElement {}
    const ComponentB = class extends HTMLElement {}
    const name = _uniqueId('TestComponent')

    expect(() => {
      defineCustomElement(name, ComponentA)
      defineCustomElement(name, ComponentB)
    }).toThrow()
  })

  it('должен выбросить исключение, если компонент c таким конструктором уже определён', () => {
    expect.hasAssertions()

    const Component = class extends HTMLElement {}
    const nameA = _uniqueId('TestComponent')
    const nameB = _uniqueId('TestComponent')

    expect(() => {
      defineCustomElement(nameA, Component)
      defineCustomElement(nameB, Component)
    }).toThrow()
  })

  it.each(['', ' ', 'component'])(
    'должен выбросить исключение, если название компонента (`%s`) не соответствует требованиям спецификации',
    (componentName) => {
      expect.hasAssertions()

      const Component = class extends HTMLElement {}

      expect(() => {
        defineCustomElement(componentName, Component)
      }).toThrow()
    }
  )
})
