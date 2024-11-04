import { describe, expectTypeOf, test } from 'vitest'
import type { Predicate } from '../predicate'

describe('Тест типа `Predicate`', () => {
  test('Должен создать предикат для определённого типа', () => {
    expectTypeOf<{ value: Predicate<unknown> }>().toEqualTypeOf<{ value: (value: unknown) => boolean }>()
    expectTypeOf<{ value: Predicate<unknown[]> }>().toEqualTypeOf<{ value: (value: unknown[]) => boolean }>()
  })
})
