import { describe, expectTypeOf, test } from 'vitest'
import type { LazyValue } from '../getter'

describe('Тест типа `Getter`', () => {
  test('Должен создать фабричную функцию для определённого типа', () => {
    expectTypeOf<{ value: LazyValue<unknown> }>().toEqualTypeOf<{ value: () => unknown }>()
  })
})
