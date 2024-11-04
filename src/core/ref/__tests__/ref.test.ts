import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import ref from '../ref'

describe('тест функции `ref`', () => {
  it('должен создать реактивное значение', () => {
    expect.hasAssertions()
    expect(ref('foo')).toStrictEqual({ value: 'foo' })
  })

  it('должен потребовать рендер компонента при изменении реактивного значения', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    currentContext.set(context)

    /* test */
    const value = ref('foo')
    value.value = 'bar'

    expect(value.value).toBe('bar')

    value.value = 'baz'
    vi.runAllTimers()

    expect(value.value).toBe('baz')
    expect(context.requestRender).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })

  it('не должен потребовать рендер компонента, если реактивное значение не изменилось', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    currentContext.set(context)

    /* test */
    const value = ref('foo')
    value.value = 'foo'
    vi.runAllTimers()

    expect(context.requestRender).not.toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })
})
