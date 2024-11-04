import { describe, expect, it } from 'vitest'
import isRef from '../is_ref'
import ref from '../ref'

describe('тест функции `isRef`', () => {
  it('должен проверить является ли значение реактивным', () => {
    expect.hasAssertions()
    expect(isRef({})).toBeFalsy()
    expect(isRef(ref(''))).toBeTruthy()
  })
})
