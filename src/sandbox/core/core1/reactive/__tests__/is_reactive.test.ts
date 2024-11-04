import { describe, expect, it } from 'vitest'
import isReactive from '../is_reactive'
import reactive from '../reactive'

describe('тест функции `isReactive`', () => {
  it('должен проверить является ли значение реактивным', () => {
    expect.hasAssertions()
    expect(isReactive(null)).toBeFalsy()
    expect(isReactive({})).toBeFalsy()
    expect(isReactive(reactive({}))).toBeTruthy()
  })
})
