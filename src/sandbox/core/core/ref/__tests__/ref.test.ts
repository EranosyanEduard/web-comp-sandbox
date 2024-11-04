import { describe, expect, it } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import ref from '../ref'

describe('тест функции `ref`', () => {
  it('должен создать реактивное значение', () => {
    expect.hasAssertions()
    expect(ref('foo')).toStrictEqual({ value: 'foo' })
  })

  it('должен подписаться на уничтожение компонента', () => {
    expect.hasAssertions()

    const comp = defineContext()
    currentContext.set(comp)
    ref({ foo: 'foo' })

    expect(comp.whenDestroyed).toHaveBeenCalledOnce()

    currentContext.set(null)
  })

  it('должен потребовать рендер компонента при изменении реактивного значения', () => {
    expect.hasAssertions()

    const comp = defineContext()
    currentContext.set(comp)
    const value = ref('foo')
    value.value = 'bar'

    expect(value.value).toBe('bar')

    value.value = 'baz'

    expect(comp.requestRender).toHaveBeenCalledTimes(2)

    currentContext.set(null)
  })

  it('не должен потребовать рендер компонента, если реактивное значение не изменилось', () => {
    expect.hasAssertions()

    const comp = defineContext()
    currentContext.set(comp)
    const value = ref('foo')
    value.value = 'foo'

    expect(value.value).toBe('foo')
    expect(comp.requestRender).not.toHaveBeenCalledOnce()

    currentContext.set(null)
  })

  it('должен позволять управлять контекстом выполнения, добавляя и удаляя из него компоненты', () => {
    expect.hasAssertions()

    const compA = defineContext()
    const compB = defineContext()
    const value = ref('foo')
    ref.store.get(value)?.useContext(compA, compB)

    expect(compA.whenDestroyed).toHaveBeenCalledOnce()
    expect(compB.whenDestroyed).toHaveBeenCalledOnce()

    value.value = 'bar'

    expect(compA.requestRender).toHaveBeenCalledOnce()
    expect(compB.requestRender).toHaveBeenCalledOnce()

    const [whenDestroyedA] = compA.whenDestroyed.mock.lastCall ?? []
    const [whenDestroyedB] = compB.whenDestroyed.mock.lastCall ?? []

    whenDestroyedA()
    whenDestroyedB()
    value.value = 'baz'

    expect(compA.requestRender).toHaveBeenCalledOnce()
    expect(compB.requestRender).toHaveBeenCalledOnce()

    currentContext.set(null)
  })
})
