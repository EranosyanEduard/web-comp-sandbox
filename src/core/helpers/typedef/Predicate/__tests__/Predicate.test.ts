import _isEmpty from 'lodash-es/isEmpty'
import { describe, expect, expectTypeOf, it } from 'vitest'
import type { Predicate } from '../Predicate'

describe('тестовый набор типа `Predicate`', () => {
  it('должен создать функцию-предикат', () => {
    expect.hasAssertions()

    const received: Predicate<string> = _isEmpty

    expectTypeOf(received).toEqualTypeOf<(value: string) => boolean>()

    expect(true).toBeTruthy()
  })
})
