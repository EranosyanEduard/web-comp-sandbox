import type { AnyArray, AnyFunction } from 'ts-essentials'
import { describe, expect, expectTypeOf, it } from 'vitest'
import type { TypeConstructor } from '../../TypeConstructor'
import type { TypeFromConstructor } from '../TypeFromConstructor'

describe('тестовый набор типа `TypeFromConstructor`', () => {
  it('должен выводить `typescript` тип на основании его конструктора', () => {
    expect.hasAssertions()

    function inferType<T extends TypeConstructor>(
      cons: T
    ): TypeFromConstructor<T> {
      // @ts-expect-error игнорировать ошибку типизации:
      // возвращаемое значение не имеет значения.
      return cons
    }

    expectTypeOf(inferType(Array)).toEqualTypeOf<AnyArray<unknown>>()
    expectTypeOf(inferType(Boolean)).toEqualTypeOf<boolean>()
    expectTypeOf(inferType(Function)).toEqualTypeOf<
      AnyFunction<unknown[], unknown>
    >()
    expectTypeOf(inferType(Number)).toEqualTypeOf<number>()
    expectTypeOf(inferType(Object)).toEqualTypeOf<object>()
    expectTypeOf(inferType(String)).toEqualTypeOf<string>()
    // Проигнорировать eslint-правило, поскольку необходимо проверить тип `any`:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectTypeOf(inferType(Array as any)).toEqualTypeOf<never>()
    expectTypeOf(inferType(Array as never)).toEqualTypeOf<never>()

    expect(true).toBeTruthy()
  })
})
