import { describe, expect, it } from 'vitest'
import isComputedRef from '../is_computed'
import computed from '../computed'

describe('тест функции `isComputedRef`', () => {
  it('должен проверить является ли значение реактивным', () => {
    expect.hasAssertions()
    expect(isComputedRef({})).toBeFalsy()
    expect(isComputedRef(computed(() => ''))).toBeTruthy()
  })
})
