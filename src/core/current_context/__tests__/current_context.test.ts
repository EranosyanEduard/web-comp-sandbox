import { describe, expect, it } from 'vitest'
import { defineContext } from '../../helpers/test'
import currentContext from '../current_context'

describe('тест интерфейса `currentInstance`', () => {
  it('должен использовать в качестве контекста выполнения по умолчанию `null`', () => {
    expect.hasAssertions()
    expect(currentContext.get()).toBeNull()
  })

  it('должен записать и прочитать текущий контекст выполнения', () => {
    expect.hasAssertions()

    const compA = defineContext()
    const compB = defineContext()

    currentContext.set(compA)

    expect(currentContext.get()).toBe(compA)

    currentContext.set(compB)

    expect(currentContext.get()).toBe(compB)

    currentContext.set(null)

    expect(currentContext.get()).toBeNull()
  })
})
