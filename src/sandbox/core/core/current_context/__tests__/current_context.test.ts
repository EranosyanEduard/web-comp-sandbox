import { describe, expect, it } from 'vitest'
import { defineContext } from '../../helpers/test'
import currentContext from '../current_context'
import type { Context } from '../typedef'

describe('тест интерфейса `currentInstance`', () => {
  it('должен использовать в качестве контекста выполнения по умолчанию `null`', () => {
    expect.hasAssertions()
    expect(currentContext.get()).toBeNull()
  })

  it('должен записать и прочитать текущий контекст выполнения', () => {
    expect.hasAssertions()

    const compA = defineContext() as Context
    const compB = defineContext() as Context

    currentContext.set(compA)

    expect(currentContext.get() === compA).toBeTruthy()

    currentContext.set(compB)

    expect(currentContext.get() === compB).toBeTruthy()

    currentContext.set(null)

    expect(currentContext.get()).toBeNull()
  })
})
