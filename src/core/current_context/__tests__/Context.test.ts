import { describe, expect, it, vi } from 'vitest'
import Context from '../Context'

describe('тестовый набор класса `Context`', () => {
  it('должен регистрировать ф-ии для события `destroy`', () => {
    expect.hasAssertions()

    const context = new Context({
      containsContext: () => {
        throw new Error('method `containsContext` not implemented')
      }
    })
    const cb1 = vi.fn()
    const cb2 = vi.fn()
    context.whenDestroyed(cb1)
    context.whenDestroyed(cb2)

    expect(cb1).not.toHaveBeenCalled()
    expect(cb2).not.toHaveBeenCalled()

    context.destroy()

    expect(cb1).toHaveBeenCalledOnce()
    expect(cb2).toHaveBeenCalledOnce()
  })

  it(`должен вызывать ф-ии для события \`destroy\` в порядке, соответствующем
    их регистрации`, () => {
    expect.hasAssertions()

    const context = new Context({
      containsContext: () => {
        throw new Error('method `containsContext` not implemented')
      }
    })
    const cb1 = vi.fn()
    const cb2 = vi.fn()
    context.whenDestroyed(cb1)
    context.whenDestroyed(cb2)

    expect(cb1).not.toHaveBeenCalled()
    expect(cb2).not.toHaveBeenCalled()

    context.destroy()

    const [callOrderCb1] = cb1.mock.invocationCallOrder
    const [callOrderCb2] = cb2.mock.invocationCallOrder

    expect(callOrderCb1).lessThan(callOrderCb2)
  })

  it('должен регистрировать ф-ии для события `mount`', () => {
    expect.hasAssertions()

    const context = new Context({
      containsContext: () => {
        throw new Error('method `containsContext` not implemented')
      }
    })
    const cb1 = vi.fn()
    const cb2 = vi.fn()
    context.whenMounted(cb1)
    context.whenMounted(cb2)

    expect(cb1).not.toHaveBeenCalled()
    expect(cb2).not.toHaveBeenCalled()

    context.mount()

    expect(cb1).toHaveBeenCalledOnce()
    expect(cb2).toHaveBeenCalledOnce()
  })

  it(`должен вызывать ф-ии для события \`mount\` в порядке, соответствующем
    их регистрации`, () => {
    expect.hasAssertions()

    const context = new Context({
      containsContext: () => {
        throw new Error('method `containsContext` not implemented')
      }
    })
    const cb1 = vi.fn()
    const cb2 = vi.fn()
    context.whenMounted(cb1)
    context.whenMounted(cb2)

    expect(cb1).not.toHaveBeenCalled()
    expect(cb2).not.toHaveBeenCalled()

    context.mount()

    const [callOrderCb1] = cb1.mock.invocationCallOrder
    const [callOrderCb2] = cb2.mock.invocationCallOrder

    expect(callOrderCb1).lessThan(callOrderCb2)
  })

  it('должен регистрировать ф-ии для события `render`', () => {
    expect.hasAssertions()

    const context = new Context({
      containsContext: () => {
        throw new Error('method `containsContext` not implemented')
      }
    })
    const cb1 = vi.fn()
    const cb2 = vi.fn()
    context.whenRequestedRender(cb1)
    context.whenRequestedRender(cb2)

    expect(cb1).not.toHaveBeenCalled()
    expect(cb2).not.toHaveBeenCalled()

    context.requestRender()

    expect(cb1).toHaveBeenCalledOnce()
    expect(cb2).toHaveBeenCalledOnce()
  })

  it(`должен вызывать ф-ии для события \`render\` в порядке, соответствующем
    их регистрации`, () => {
    expect.hasAssertions()

    const context = new Context({
      containsContext: () => {
        throw new Error('method `containsContext` not implemented')
      }
    })
    const cb1 = vi.fn()
    const cb2 = vi.fn()
    context.whenRequestedRender(cb1)
    context.whenRequestedRender(cb2)

    expect(cb1).not.toHaveBeenCalled()
    expect(cb2).not.toHaveBeenCalled()

    context.requestRender()

    const [callOrderCb1] = cb1.mock.invocationCallOrder
    const [callOrderCb2] = cb2.mock.invocationCallOrder

    expect(callOrderCb1).lessThan(callOrderCb2)
  })

  it('должен использовать ф-ю `containsContext` в предоставленном виде', () => {
    expect.hasAssertions()

    const context1 = new Context({ containsContext: () => false })
    const context2 = new Context({ containsContext: () => true })

    expect(context1.containsContext(context2)).toBeFalsy()
    expect(context2.containsContext(context1)).toBeTruthy()
  })
})
