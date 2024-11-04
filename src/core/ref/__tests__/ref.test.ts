import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import ref from '../ref'

describe('тестовый набор функции `ref`', () => {
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

  it('должен установить и прекратить наблюдение за значением', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    const watcher = vi.fn()
    currentContext.set(context)

    /* test */
    const value = ref('foo')
    const stop = ref._INSTANCES.get(value)?.whenChanged(watcher) ?? vi.fn()
    value.value = 'bar'

    expect(value.value).toBe('bar')

    value.value = 'baz'

    expect(value.value).toBe('baz')

    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith({
      nextValue: 'baz',
      prevValue: 'bar'
    })

    stop()
    value.value = 'foo'
    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })
})
