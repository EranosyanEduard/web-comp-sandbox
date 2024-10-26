import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import reactive from '../reactive'

describe('тест функции `reactive`', () => {
  it('должен создать точную "копию" пользовательского объекта', () => {
    expect.hasAssertions()
    expect(reactive({ foo: 'foo' })).toStrictEqual({ foo: 'foo' })
  })

  it('должен подписаться на уничтожение компонента при создании реактивного значения', () => {
    expect.hasAssertions()

    /* before */
    const context = defineContext()
    currentContext.set(context)

    /* test */
    reactive({ foo: 'foo' })

    expect(context.whenDestroyed).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
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

  it('должен позволять управлять контекстом выполнения, добавляя и удаляя из него компоненты', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()

    /* test */
    const values = reactive({ foo: 'foo' })
    reactive._store.get(values)?.addContext(context)

    expect(context.whenDestroyed).toHaveBeenCalledOnce()

    values.foo = 'bar'
    vi.runAllTimers()

    expect(context.requestRender).toHaveBeenCalledOnce()

    const [whenDestroyedA = vi.fn()] = vi.mocked(context).whenDestroyed.mock.lastCall ?? []
    whenDestroyedA()
    values.foo = 'baz'
    vi.runAllTimers()

    expect(context.requestRender).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })
})
