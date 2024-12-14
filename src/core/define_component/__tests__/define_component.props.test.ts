import { html, render } from 'lit-html'
import { describe, expect, it, vi } from 'vitest'
import defineComponent from '../define_component'

describe('тестовый набор функции `defineComponent`', () => {
  defineComponent({
    name: 'VCounter',
    props: {
      count: {
        required: true,
        type: Number
      }
    },
    setup: (props) => () => html`<span>${props.count}</span>`
  })

  it('должен реализовать интерфейс, позволяющий использовать props-ы', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const mountApp = (count: number): void => {
      render(html`<v-counter .count=${count}></v-counter>`, document.body)
    }

    /* test */
    mountApp(0)
    vi.runAllTimers()

    expect(document.body.firstElementChild?.textContent).toBe('0')

    mountApp(1)
    vi.runAllTimers()

    expect(document.body.firstElementChild?.textContent).toBe('1')

    /* after */
    vi.useRealTimers()
  })
})
