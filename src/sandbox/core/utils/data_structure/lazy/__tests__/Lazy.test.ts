import { describe, expect, test, vi } from 'vitest'
import Lazy from '../Lazy'

describe('Тест структуры данных `Lazy`', () => {
  test('Не должен вычислять значение при вызове конструктора', () => {
    const zero = 0
    let number = zero
    vi.fn(() => new Lazy(() => ++number))()
    expect(number).toBe(zero)
  })
  test('Должен вычислить значение при чтении свойства `value`', () => {
    const zero = 0
    const one = 1
    let number = zero
    expect(new Lazy(() => ++number).value).toBe(one)
  })
  test('Должен вычислить значение при чтении свойства `value` однажды', () => {
    const zero = 0
    const one = 1
    let number = zero
    const lazy = new Lazy(() => ++number)
    expect(lazy.value).toBe(one)
    expect(lazy.value).toBe(one)
    expect(lazy.value).toBe(one)
  })
  describe('Метод метода `map`', () => {
    const zero = 0
    const lazyNumberSpy = vi.fn((num: number): number => num)
    const lazyStringSpy = vi.fn((str: number): string => str.toString())
    const lazyNumber = new Lazy(() => lazyNumberSpy(zero))
    const lazyString = lazyNumber.map(lazyStringSpy)
    test('Должен создать новый экземпляр класса `Lazy`', () => {
      // @ts-expect-error Нарушить типизацию для тестирования.
      expect(lazyNumber !== lazyString).toBeTruthy()
    })
    test('Не должен вычислить значение `lazyNumber` до чтения свойства `lazyString.value`', () => {
      expect(lazyNumberSpy).not.toHaveBeenCalled()
    })
    test('Не должен вычислить значение `lazyString` до чтения свойства `lazyString.value`', () => {
      expect(lazyStringSpy).not.toHaveBeenCalled()
    })
    test('Должен вычислить значение `lazyString` при чтении свойства `value`', () => {
      expect(lazyString.value, '1')
    })
  })
})
