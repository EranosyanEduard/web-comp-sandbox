import { describe, expect, it } from 'vitest'
import { accessor } from '../../current_instance'
import { defineInstance } from '../../helpers/test'
import ref from '../ref'
import { REF_UNIQUE_SYMBOL } from '../constants'

describe('тест функции `ref`', () => {
  it('должен создать реактивное значение', () => {
    expect.hasAssertions()
    expect(ref('foo')).toStrictEqual({ value: 'foo' })
  })

  it('должен подписаться на уничтожение компонента', () => {
    expect.hasAssertions()

    const comp = defineInstance()
    accessor.set(comp)
    ref({ foo: 'foo' })

    expect(comp.whenDestroyed).toHaveBeenCalledOnce()

    accessor.set(null)
  })

  it('должен потребовать рендер компонента при изменении реактивного значения', () => {
    expect.hasAssertions()

    const comp = defineInstance()
    accessor.set(comp)
    const value = ref('foo')
    value.value = 'bar'

    expect(value.value).toBe('bar')

    value.value = 'baz'

    expect(comp.requestRender).toHaveBeenCalledTimes(2)

    accessor.set(null)
  })

  it('не должен потребовать рендер компонента, если реактивное значение не изменилось', () => {
    expect.hasAssertions()

    const comp = defineInstance()
    accessor.set(comp)
    const value = ref('foo')
    value.value = 'foo'

    expect(value.value).toBe('foo')
    expect(comp.requestRender).not.toHaveBeenCalledOnce()

    accessor.set(null)
  })

  it('должен позволять управлять контекстом выполнения, добавляя и удаляя из него компоненты', () => {
    expect.hasAssertions()

    const compA = defineInstance()
    const compB = defineInstance()
    const value = ref('foo')
    value[REF_UNIQUE_SYMBOL].updateInstances(compA, compB)

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

    accessor.set(null)
  })
})
