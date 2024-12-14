import { describe, expect, expectTypeOf, it } from 'vitest'
import type { StartsWith } from '../StartsWith'

describe('тестовый набор типа `StartsWith`', () => {
  it('должен определить начинается ли строка с подстроки', () => {
    expect.hasAssertions()

    expectTypeOf<StartsWith<'JavaScript', 'Java'>>().toEqualTypeOf<true>()
    expectTypeOf<StartsWith<'TypeScript', 'Java'>>().toEqualTypeOf<false>()

    expect(true).toBeTruthy()
  })
})
