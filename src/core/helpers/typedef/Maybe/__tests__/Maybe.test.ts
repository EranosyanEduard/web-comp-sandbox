import { describe, expect, expectTypeOf, it } from 'vitest'
import type { Maybe } from '../Maybe'

describe('тестовый набор типа `Maybe`', () => {
  it('должен создать nullable-значение', () => {
    expect.hasAssertions()

    function getOrNull(numbers: number[], index: number): Maybe<number> {
      return numbers[index] ?? null
    }

    expectTypeOf(getOrNull).toEqualTypeOf<
      (numbers: number[], index: number) => number | null
    >()

    expect(true).toBeTruthy()
  })
})
