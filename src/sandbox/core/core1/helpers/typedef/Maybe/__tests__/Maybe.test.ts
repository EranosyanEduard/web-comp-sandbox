import { describe, expect, expectTypeOf, it } from 'vitest'
import type { Maybe } from '../Maybe'

describe('тест типа `Maybe`', () => {
  it('должен создать nullable-значение', () => {
    expect.hasAssertions()

    const received: { _: Maybe<boolean> } = { _: true }

    expectTypeOf(received).toEqualTypeOf<{ _: boolean | null }>()

    expect(received).toStrictEqual(received)
  })
})
