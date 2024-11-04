import { html, render } from 'lit-html'
import _uniqueId from 'lodash-es/uniqueId'
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'
import * as DefineCustomElement from '../../define_custom_element'
import defineComponent from '../define_component'

describe('Тест функции `defineComponent`', () => {
  const defineCustomElementSpy = vi.spyOn(DefineCustomElement, 'defineCustomElement')

  /* `defineCustomElement` */
  test('Должен определить компонент', () => {
    const expectedLastCallArgs = 2
    const TestComponent = defineComponent({
      name: _uniqueId('TestComponent'),
      setup: () => () => html`<div></div>`
    })
    const lastCallArgs = defineCustomElementSpy.mock.lastCall ?? []
    const [componentName, Component] = lastCallArgs
    expect(defineCustomElementSpy).toHaveBeenCalledOnce()
    expect(lastCallArgs).toHaveLength(expectedLastCallArgs)
    expect(componentName).toMatch(/TestComponent\d+/)
    expect(Component).toBe(TestComponent)
  })
  describe('Props api', () => {
    beforeAll(() => {
      vi.useFakeTimers()
    })
    afterAll(() => {
      vi.useRealTimers()
    })
    test('Должен реализовать интерфейс, позволяющий использовать props-ы', () => {
      defineComponent({
        name: 'VCounter',
        props: {
          count: {
            required: true,
            type: Number
          }
        },
        setup(props) {
          return () => html`<span>${props.count}</span>`
        }
      })
      const renderTemplate = (count: number): void => {
        render(html`<v-counter .count=${count}></v-counter>`, document.body)
        vi.runAllTimers()
      }
      const maxCount = 1
      const minCount = 0
      renderTemplate(minCount)
      expect(document.body.firstElementChild?.textContent).toBe(minCount.toString())
      renderTemplate(maxCount)
      expect(document.body.firstElementChild?.textContent).toBe(maxCount.toString())
    })
  })
})
