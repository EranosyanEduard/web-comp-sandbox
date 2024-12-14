import { describe, expect, expectTypeOf, it } from 'vitest'
import type { TypeFromConstructor } from '../TypeFromConstructor'

describe('тестовый набор типа `TypeFromConstructor`', () => {
  it('должен выводить `typescript` тип на основании его конструктора', () => {
    expect.hasAssertions()

    expectTypeOf<TypeFromConstructor<ArrayConstructor>>().toEqualTypeOf<unknown[]>()
    expectTypeOf<TypeFromConstructor<BooleanConstructor>>().toEqualTypeOf<boolean>()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    expectTypeOf<TypeFromConstructor<FunctionConstructor>>().toEqualTypeOf<Function>()
    expectTypeOf<TypeFromConstructor<NumberConstructor>>().toEqualTypeOf<number>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectTypeOf<TypeFromConstructor<ObjectConstructor>>().toEqualTypeOf<any>()
    expectTypeOf<TypeFromConstructor<StringConstructor>>().toEqualTypeOf<string>()

    expect(true).toBeTruthy()
  })

  it('нежелательные случаи', () => {
    expect.hasAssertions()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectTypeOf<TypeFromConstructor<any>>().toEqualTypeOf<never>()
    expectTypeOf<TypeFromConstructor<never>>().toEqualTypeOf<never>()

    expect(true).toBeTruthy()
  })
})
