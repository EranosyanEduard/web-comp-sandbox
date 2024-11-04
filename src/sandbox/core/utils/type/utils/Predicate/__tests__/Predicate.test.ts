import type { AnyFunction } from 'ts-essentials'
import { describe, expectTypeOf, test } from 'vitest'
import type { Predicate } from '../Predicate.typedef'

describe('Тест типа `Predicate`', () => {
  test('Должен создать предикат для определённого типа', () => {
    expectTypeOf<{ value: Predicate<unknown> }>().toEqualTypeOf<{ value: AnyFunction<[unknown], boolean> }>()
    expectTypeOf<{ value: Predicate<unknown[]> }>().toEqualTypeOf<{ value: AnyFunction<[unknown[]], boolean> }>()
  })
})
