import type { AnyArray, AnyFunction } from 'ts-essentials'
import { describe, expectTypeOf, test } from 'vitest'
import type { TypeFromConstructor } from '../TypeFromConstructor.typedef'

describe('Тест типа `TypeFromConstructor`', () => {
  test('Должен выводить `typescript` тип на основании его конструктора', () => {
    expectTypeOf<{ v: TypeFromConstructor<ArrayConstructor> }>().toEqualTypeOf<{
      v: AnyArray<unknown>
    }>()
    expectTypeOf<{ v: TypeFromConstructor<BooleanConstructor> }>().toEqualTypeOf<{ v: boolean }>()
    expectTypeOf<{ v: TypeFromConstructor<FunctionConstructor> }>().toEqualTypeOf<{
      v: AnyFunction<unknown[], unknown>
    }>()
    expectTypeOf<{ v: TypeFromConstructor<NumberConstructor> }>().toEqualTypeOf<{ v: number }>()
    expectTypeOf<{ v: TypeFromConstructor<ObjectConstructor> }>().toEqualTypeOf<{ v: object }>()
    expectTypeOf<{ v: TypeFromConstructor<StringConstructor> }>().toEqualTypeOf<{ v: string }>()
    // Проигнорировать eslint-правило, поскольку необходимо проверить тип `any`:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectTypeOf<{ v: TypeFromConstructor<any> }>().toEqualTypeOf<{ v: never }>()
    expectTypeOf<{ v: TypeFromConstructor<never> }>().toEqualTypeOf<{ v: never }>()
  })
})
