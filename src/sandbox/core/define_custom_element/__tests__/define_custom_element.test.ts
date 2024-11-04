import _kebabCase from 'lodash-es/kebabCase'
import _uniqueId from 'lodash-es/uniqueId'
import { describe, expect, test } from 'vitest'
import defineCustomElement from '../define_custom_element'

describe('Тест функции `defineCustomElement`', () => {
  test('Должен определить компонент', () => {
    const Component = class extends HTMLElement {}
    const name = _kebabCase(_uniqueId('TestComponent'))
    defineCustomElement(name, Component)
    expect(customElements.get(name)).toBe(Component)
  })
  test('Должен преобразовать название компонента в `kebab-case`', () => {
    const Component = class extends HTMLElement {}
    const name = _uniqueId('TestComponent')
    defineCustomElement(name, Component)
    expect(customElements.get(name)).toBeUndefined()
    expect(customElements.get(_kebabCase(name))).toBe(Component)
  })
  test('Должен выбросить исключение, если компонент с таким названием уже определён', () => {
    const ComponentA = class extends HTMLElement {}
    const ComponentB = class extends HTMLElement {}
    const name = _uniqueId('TestComponent')
    expect(() => {
      defineCustomElement(name, ComponentA)
      defineCustomElement(name, ComponentB)
    }).toThrowError()
  })
  test('Должен выбросить исключение, если компонент c таким конструктором уже определён', () => {
    const Component = class extends HTMLElement {}
    const nameA = _uniqueId('TestComponent')
    const nameB = _uniqueId('TestComponent')
    expect(() => {
      defineCustomElement(nameA, Component)
      defineCustomElement(nameB, Component)
    }).toThrowError()
  })
  test.each(['', ' ', 'component'])(
    'Должен выбросить исключение, если название компонента (`%s`) не соответствует требованиям спецификации',
    (componentName) => {
      const Component = class extends HTMLElement {}
      expect(() => {
        defineCustomElement(componentName, Component)
      }).toThrowError()
    }
  )
})
