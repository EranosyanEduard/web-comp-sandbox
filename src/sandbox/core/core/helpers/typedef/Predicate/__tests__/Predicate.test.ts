import { describe, expect, expectTypeOf, it } from 'vitest'
import type { Predicate } from '../Predicate'

describe('тест типа `Predicate`', () => {
  it('должен создать функцию-предикат', () => {
    expect.hasAssertions()

    const received: { _: Predicate<number> } = { _: (value) => value > 0 }

    expectTypeOf(received).toEqualTypeOf<{ _: (value: number) => boolean }>()

    expect(received).toStrictEqual(received)
  })
})
