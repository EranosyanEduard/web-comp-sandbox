import type { AnyFunction } from 'ts-essentials'
import { describe, expectTypeOf, test } from 'vitest'
import type { LazyValue } from '../LazyValue.typedef'

describe('Тест типа `Getter`', () => {
  test('Должен создать фабричную функцию для определённого типа', () => {
    expectTypeOf<{ value: LazyValue<unknown> }>().toEqualTypeOf<{ value: AnyFunction<[], unknown> }>()
  })
})
