import { describe, expect, test } from 'vitest'
import isReactive from '../is_reactive'
import reactive from '../reactive'

describe('Тест функции `isReactive`', () => {
  test('Должен вернуть значение `false`, если объект не является реактивным', () => {
    expect(isReactive({})).toBeFalsy()
  })
  test('Должен вернуть значение `true`, если объект является реактивным', () => {
    expect(isReactive(reactive({}))).toBeTruthy()
  })
})
