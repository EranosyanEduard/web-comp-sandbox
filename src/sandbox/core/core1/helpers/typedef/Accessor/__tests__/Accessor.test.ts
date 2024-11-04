import type { AnyFunction } from 'ts-essentials'
import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import type { Accessor } from '../Accessor'

describe('тест типа `Accessor`', () => {
  it('должен создать свойство доступа для определённого типа', () => {
    expect.hasAssertions()

    interface Expected {
      readonly get: AnyFunction<[], unknown>
      readonly set: AnyFunction<[unknown], void>
    }

    const received: { _: Accessor<unknown> } = {
      _: { get: vi.fn(), set: vi.fn() }
    }

    expectTypeOf(received).toEqualTypeOf<{ _: Expected }>()

    expect(received).toStrictEqual(received)
  })
})
