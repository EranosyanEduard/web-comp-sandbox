import { html } from 'lit-html'
import _kebabCase from 'lodash-es/kebabCase'
import _uniqueId from 'lodash-es/uniqueId'
import { describe, expect, it } from 'vitest'
import defineComponent from '../define_component'

describe('тестовый набор функции `defineComponent`', () => {
  it('должен определить веб-компонент', () => {
    expect.hasAssertions()

    const componentName = _kebabCase(_uniqueId('TestComponent'))

    expect(customElements.get(componentName)).toBeUndefined()

    defineComponent({
      name: componentName,
      setup: () => () => html`<div></div>`
    })

    expect(customElements.get(componentName)).toBeDefined()
  })
})
