import type { AnyFunction } from 'ts-essentials'
import { describe, expectTypeOf, test } from 'vitest'
import type { Accessor } from '../Accessor.typedef'

describe('Тест типа `Accessor`', () => {
  test('Должен создать свойство доступа для определённого типа', () => {
    expectTypeOf<{ value: Accessor<unknown> }>().toEqualTypeOf<{
      value: {
        readonly get: AnyFunction<[], unknown>
        readonly set: AnyFunction<[unknown], void>
      }
    }>()
  })
})
