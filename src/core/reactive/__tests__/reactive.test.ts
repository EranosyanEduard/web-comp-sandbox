import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import reactive from '../reactive'

describe('тестовый набор функции `reactive`', () => {
  it('должен создать точную "копию" пользовательского объекта', () => {
    expect.hasAssertions()
    expect(reactive({ foo: 'foo' })).toStrictEqual({ foo: 'foo' })
  })

  it('должен потребовать рендер компонента при изменении значения свойства объекта', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    currentContext.set(context)

    /* test */
    const values = reactive({ foo: 'foo' })
    values.foo = 'bar'

    expect(values.foo).toBe('bar')

    values.foo = 'baz'

    expect(values.foo).toBe('baz')

    vi.runAllTimers()

    expect(context.requestRender).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })

  it('не должен требовать рендер компонента, если значение свойства объекта не изменилось', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const comp = defineContext()
    currentContext.set(comp)

    /* test */
    const values = reactive({ foo: 'foo' })
    values.foo = 'foo'
    vi.runAllTimers()

    expect(comp.requestRender).not.toHaveBeenCalled()

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
    const values = reactive({ foo: 'foo' })
    const stop =
      reactive._INSTANCES.get(values)?.whenChanged(watcher) ?? vi.fn()
    values.foo = 'bar'

    expect(values.foo).toBe('bar')

    values.foo = 'baz'

    expect(values.foo).toBe('baz')

    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith({
      nextValue: 'baz',
      prevValue: 'bar'
    })

    stop()
    values.foo = 'foo'
    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })
})
