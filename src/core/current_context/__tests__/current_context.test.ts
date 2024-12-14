import { describe, expect, it, vi } from 'vitest'
import { defineContext } from '../../helpers/test'
import currentContext from '../current_context'

describe('тестовый набор интерфейса `currentInstance`', () => {
  it('должен использовать в качестве контекста выполнения по умолчанию `null`', () => {
    expect.hasAssertions()
    expect(currentContext.get()).toBeNull()
  })

  it('должен записать и прочитать текущий контекст выполнения', () => {
    expect.hasAssertions()

    const compA = defineContext()
    const compB = defineContext()
    const contextGetter = vi.spyOn(currentContext, 'get')
    currentContext.set(compA)
    currentContext.get()
    currentContext.set(compB)
    currentContext.get()
    currentContext.set(null)
    currentContext.get()

    expect(contextGetter).toHaveNthReturnedWith(1, compA)
    expect(contextGetter).toHaveNthReturnedWith(2, compB)
    expect(contextGetter).toHaveLastReturnedWith(null)
  })
})
