import _isEmpty from 'lodash-es/isEmpty'
import { describe, expect, expectTypeOf, it } from 'vitest'
import type { Predicate } from '../Predicate'

describe('тест типа `Predicate`', () => {
  it('должен создать функцию-предикат', () => {
    expect.hasAssertions()

    const received: { _: Predicate<string> } = { _: _isEmpty }

    expectTypeOf(received).toEqualTypeOf<{ _: (value: string) => boolean }>()

    expect(received).toBe(received)
  })
})
