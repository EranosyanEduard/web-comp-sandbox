import { describe, expect, it } from 'vitest'
import { defineInstance } from '../../helpers/test'
import accessor from '../current_instance'

describe('тест интерфейса `currentInstance`', () => {
  it('должен использовать в качестве контекста выполнения по умолчанию `null`', () => {
    expect.hasAssertions()
    expect(accessor.get()).toBeNull()
  })

  it('должен записать и прочитать текущий контекст выполнения', () => {
    expect.hasAssertions()

    const compA = defineInstance()
    const compB = defineInstance()

    accessor.set(compA)

    expect(accessor.get() === compA).toBeTruthy()

    accessor.set(compB)

    expect(accessor.get() === compB).toBeTruthy()

    accessor.set(null)

    expect(accessor.get()).toBeNull()
  })
})
