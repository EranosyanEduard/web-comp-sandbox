import { describe, expect, it } from 'vitest'
import ReadonlyPropertyError from '../ReadonlyPropertyError'

describe('тестовый набор класса `ReadonlyPropertyError`', () => {
  it('должен выбросить исключение', () => {
    expect.hasAssertions()
    expect(() => {
      throw new ReadonlyPropertyError({ property: 'value' })
    }).toThrow('Свойство "value" доступно только для чтения')
  })
})
