import { describe, expect, it } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import reactive from '../reactive'

describe('тест функции `reactive`', () => {
  it('должен создать точную "копию" пользовательского объекта', () => {
    expect.hasAssertions()
    expect(reactive({ foo: 'foo' })).toStrictEqual({ foo: 'foo' })
  })

  it('должен подписаться на уничтожение компонента', () => {
    expect.hasAssertions()

    const comp = defineContext()
    currentContext.set(comp)
    reactive({ foo: 'foo' })

    expect(comp.whenDestroyed).toHaveBeenCalledOnce()

    currentContext.set(null)
  })

  it('должен потребовать рендер компонента при изменении значения свойства объекта', () => {
    expect.hasAssertions()

    const comp = defineContext()
    currentContext.set(comp)
    const values = reactive({ foo: 'foo' })
    values.foo = 'bar'

    expect(values.foo).toBe('bar')

    values.foo = 'baz'

    expect(values.foo).toBe('baz')
    expect(comp.requestRender).toHaveBeenCalledTimes(2)

    currentContext.set(null)
  })

  it('не должен требовать рендер компонента, если значение свойства объекта не изменилось', () => {
    expect.hasAssertions()

    const comp = defineContext()
    currentContext.set(comp)
    const values = reactive({ foo: 'foo' })
    values.foo = 'foo'

    expect(values.foo).toBe('foo')
    expect(comp.requestRender).not.toHaveBeenCalled()

    currentContext.set(null)
  })

  it('должен позволять управлять контекстом выполнения, добавляя и удаляя из него компоненты', () => {
    expect.hasAssertions()

    const compA = defineContext()
    const compB = defineContext()
    const values = reactive({ foo: 'foo' })
    reactive.store.get(values)?.useContext(compA, compB)

    expect(compA.whenDestroyed).toHaveBeenCalledOnce()
    expect(compB.whenDestroyed).toHaveBeenCalledOnce()

    values.foo = 'bar'

    expect(compA.requestRender).toHaveBeenCalledOnce()
    expect(compB.requestRender).toHaveBeenCalledOnce()

    const [whenDestroyedA] = compA.whenDestroyed.mock.lastCall ?? []
    const [whenDestroyedB] = compB.whenDestroyed.mock.lastCall ?? []
    whenDestroyedA()
    whenDestroyedB()
    values.foo = 'baz'

    expect(compA.requestRender).toHaveBeenCalledOnce()
    expect(compB.requestRender).toHaveBeenCalledOnce()

    currentContext.set(null)
  })
})
