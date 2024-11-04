import { describe, expect, expectTypeOf, it } from 'vitest'
import type { Accessor } from '../Accessor'

describe('тестовый набор типа `Accessor`', () => {
  it('должен создать свойство доступа для определённого типа', () => {
    expect.hasAssertions()

    interface Context {
      readonly use: VoidFunction
    }

    function defineContext(): Accessor<Context | null> {
      let context: Context | null = null
      const accessor: Accessor<Context | null> = {
        get: () => context,
        set: (value) => {
          context = value
        }
      }
      return accessor
    }

    expectTypeOf(defineContext).toEqualTypeOf<
      () => {
        readonly get: () => Context | null
        readonly set: (value: Context | null) => void
      }
    >()

    expect(true).toBeTruthy()
  })
})
