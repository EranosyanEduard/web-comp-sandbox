import { describe, expect, test } from 'vitest'
import isRef from '../is_ref'
import ref from '../ref'

describe('Тест функции `isRef`', () => {
  test('Должен вернуть значение `false`, если объект не является реактивным', () => {
    expect(isRef({})).toBeFalsy()
  })
  test('Должен вернуть значение `true`, если объект является реактивным', () => {
    expect(isRef(ref(''))).toBeTruthy()
  })
})
