import { describe, expect, it } from 'vitest'
import { accessor } from '../../current_instance'
import { defineInstance } from '../../helpers/test'
import reactive from '../reactive'
import Reactive from '../Reactive.impl'

describe('тест функции `reactive`', () => {
  it('должен создать точную "копию" пользовательского объекта', () => {
    expect.hasAssertions()
    expect(reactive({ foo: 'foo' })).toStrictEqual({ foo: 'foo' })
  })

  it('должен подписаться на уничтожение компонента', () => {
    expect.hasAssertions()

    const comp = defineInstance()
    accessor.set(comp)
    reactive({ foo: 'foo' })

    expect(comp.whenDestroyed).toHaveBeenCalledOnce()

    accessor.set(null)
  })

  it('должен потребовать рендер компонента при изменении значения свойства объекта', () => {
    expect.hasAssertions()

    const comp = defineInstance()
    accessor.set(comp)
    const values = reactive({ foo: 'foo' })
    values.foo = 'bar'

    expect(values.foo).toBe('bar')

    values.foo = 'baz'

    expect(values.foo).toBe('baz')
    expect(comp.requestRender).toHaveBeenCalledTimes(2)

    accessor.set(null)
  })

  it('не должен требовать рендер компонента, если значение свойства объекта не изменилось', () => {
    expect.hasAssertions()

    const comp = defineInstance()
    accessor.set(comp)
    const values = reactive({ foo: 'foo' })
    values.foo = 'foo'

    expect(values.foo).toBe('foo')
    expect(comp.requestRender).not.toHaveBeenCalled()

    accessor.set(null)
  })

  it('должен позволять управлять контекстом выполнения, добавляя и удаляя из него компоненты', () => {
    expect.hasAssertions()

    const compA = defineInstance()
    const compB = defineInstance()
    const values = reactive({ foo: 'foo' })
    Reactive.store.get(values)?.updateInstances(compA, compB)

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

    accessor.set(null)
  })
})
