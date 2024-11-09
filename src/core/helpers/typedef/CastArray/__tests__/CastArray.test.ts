import { describe, expect, expectTypeOf, it } from 'vitest'
import type { CastArray } from '../CastArray'

describe('тестовый набор типа `CastArray`', () => {
  it('должен создать кортеж', () => {
    expect.hasAssertions()

    function toArray<T>(value: T): CastArray<T> {
      // @ts-expect-error игнорировать ошибку типизации:
      // значение соответствует типу, возвращаемому функцией.
      return Array.isArray(value) ? value : [value]
    }

    expectTypeOf(toArray('')).toEqualTypeOf<[string]>()
    expectTypeOf(toArray('' as const)).toEqualTypeOf<['']>()
    expectTypeOf(toArray([''])).toEqualTypeOf<string[]>()
    expectTypeOf(toArray([''] as const)).toEqualTypeOf<readonly ['']>()
    expectTypeOf(toArray(null)).toEqualTypeOf<[null]>()
    expectTypeOf(toArray(undefined)).toEqualTypeOf<[undefined]>()

    expect(true).toBeTruthy()
  })
})
