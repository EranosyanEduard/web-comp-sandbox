import { describe, expectTypeOf, test } from 'vitest'
import type { TypesFromConstructors } from '../types_from_constructors'

describe('Тест типа `TypesFromConstructors`', () => {
  test('Должен выводить `typescript` тип на основании единственного конструктора', () => {
    expectTypeOf<{ v: TypesFromConstructors<ArrayConstructor> }>().toEqualTypeOf<{
      v: unknown[] | readonly unknown[]
    }>()
    expectTypeOf<{ v: TypesFromConstructors<BooleanConstructor> }>().toEqualTypeOf<{ v: boolean }>()
    expectTypeOf<{ v: TypesFromConstructors<FunctionConstructor> }>().toEqualTypeOf<{
      v: (...args: unknown[]) => unknown
    }>()
    expectTypeOf<{ v: TypesFromConstructors<NumberConstructor> }>().toEqualTypeOf<{ v: number }>()
    expectTypeOf<{ v: TypesFromConstructors<ObjectConstructor> }>().toEqualTypeOf<{ v: object }>()
    expectTypeOf<{ v: TypesFromConstructors<StringConstructor> }>().toEqualTypeOf<{ v: string }>()
    // Проигнорировать eslint-правило, поскольку необходимо проверить тип `any`:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectTypeOf<{ v: TypesFromConstructors<any> }>().toEqualTypeOf<{ v: never }>()
    expectTypeOf<{ v: TypesFromConstructors<never> }>().toEqualTypeOf<{ v: never }>()
  })
  test('Должен выводить `typescript` тип на основании кортежа конструкторов', () => {
    expectTypeOf<{ v: TypesFromConstructors<[NumberConstructor, StringConstructor]> }>().toEqualTypeOf<{
      v: number | string
    }>()
    // Проигнорировать eslint-правило, поскольку необходимо проверить тип `any[]`:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectTypeOf<{ v: TypesFromConstructors<any[]> }>().toEqualTypeOf<{ v: never }>()
  })
})
