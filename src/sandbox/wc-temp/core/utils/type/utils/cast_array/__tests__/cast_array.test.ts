import { describe, expectTypeOf, test } from 'vitest'
import type { CastArray } from '../cast_array'

describe('Тест типа `CastArray`', () => {
  test('Должен приводить тип к кортежу', () => {
    expectTypeOf<{ value: CastArray<[]> }>().toEqualTypeOf<{ value: [] }>()
    expectTypeOf<{ value: CastArray<['foo']> }>().toEqualTypeOf<{ value: ['foo'] }>()
    expectTypeOf<{ value: CastArray<'foo'> }>().toEqualTypeOf<{ value: ['foo'] }>()
  })
})
