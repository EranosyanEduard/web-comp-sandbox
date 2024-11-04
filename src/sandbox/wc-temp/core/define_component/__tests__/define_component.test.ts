import _noop from 'lodash-es/noop'
import _uniqueId from 'lodash-es/uniqueId'
import { describe, expect, test } from 'vitest'
import { defineCustomElement } from '../../define_custom_element'
import { test } from '../../utils'
import defineComponent from '../define_component'
import type { ComponentOptions, SuperProps } from '../typedef'

describe('Функция `defineComponent`', () => {
  function defineTestComponent<Props extends SuperProps>(
    options?: Partial<ComponentOptions<Props>>
  ): CustomElementConstructor {
    return defineComponent({ name: test.uniqueComponentName(), setup: _noop, ...options })
  }

  /* Поведение, возникающее из-за использования функции `defineCustomElement` */
  test('Должен определить компонент', () => {
    const componentName = test.uniqueComponentName()
    const Component = defineTestComponent({ name: componentName })
    expect(customElements.get(componentName) === Component).toBeTruthy()
  })
  test('Должен выбросить исключение, если компонент с таким названием уже определён', () => {
    const componentName = test.uniqueComponentName()
    defineTestComponent({ name: componentName })
    expect(() => defineTestComponent({ name: componentName })).toThrowError()
  })
  test('Должен выбросить исключение, если компонент c таким конструктором уже определён', () => {
    const Component = defineTestComponent({ name: test.uniqueComponentName() })
    expect(() => defineCustomElement(test.uniqueComponentName(), Component)).toThrowError()
  })
  test('Должен преобразовать название компонента в `kebab-case`', () => {
    const uniqueId = _uniqueId()
    const componentName = `TestComponent${uniqueId}`
    const definedComponentName = `test-component-${uniqueId}`
    expect(customElements.get(definedComponentName)).toBeUndefined()
    const Component = defineTestComponent({ name: componentName })
    expect(customElements.get(definedComponentName) === Component).toBeTruthy()
  })
  test('Должен выбросить исключение, если название компонента не соответствует требованиям спецификации', () => {
    expect(() => defineTestComponent({ name: '' }), 'пустая строка').toThrowError()
    expect(() => defineTestComponent({ name: '   ' }), 'строка, содержащая только пробелы').toThrowError()
    expect(
      () => defineTestComponent({ name: 'foo' }),
      'значение, которое невозможно преобразовать в `kebab-case`'
    ).toThrowError()
  })
  /* Props-ы */
  test('Должен определить props-ы компонента', () => {
    const VInput = defineTestComponent({
      props: {
        disabled: { type: Boolean },
        id: { type: String },
        value: { type: String }
      }
    })
    // @ts-expect-error Компонент содержит данное свойство.
    const props = VInput.observedAttributes
    const propsSize = 3
    expect(props, 'количество props-ов').toHaveLength(propsSize)
    expect(props, 'props disabled').toContain('disabled')
    expect(props, 'props id').toContain('id')
    expect(props, 'props value').toContain('value')
  })
  test('Должен преобразовать названия props-ов компонента в `kebab-case`', () => {
    const VInput = defineTestComponent({
      props: {
        hideDetails: { type: Boolean },
        hideLabel: { type: Boolean }
      }
    })
    // @ts-expect-error Компонент содержит данное свойство.
    const props = VInput.observedAttributes
    expect(props, 'props hideDetails').toContain('hide-details')
    expect(props, 'props hideLabel').toContain('hide-label')
  })
})
