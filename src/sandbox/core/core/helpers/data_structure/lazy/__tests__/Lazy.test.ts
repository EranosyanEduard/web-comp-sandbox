import { describe, expect, it, vi } from 'vitest'
import Lazy from '../Lazy'

describe('тест структуры данных `Lazy`', () => {
  it('не должен вычислять значение при вызове конструктора', () => {
    expect.hasAssertions()

    let number = 0
    vi.fn(() => new Lazy(() => ++number))()

    expect(number).toBe(0)
  })

  it('должен вычислить значение при чтении свойства `value`', () => {
    expect.hasAssertions()

    let number = 0

    expect(new Lazy(() => ++number).value).toBe(1)
  })

  it('должен вычислить значение при чтении свойства `value` однажды', () => {
    expect.hasAssertions()

    let number = 0
    const lazy = new Lazy(() => ++number)

    expect(lazy.value).toBe(1)
    expect(lazy.value).toBe(1)
    expect(lazy.value).toBe(1)
  })

  describe('метод метода `map`', () => {
    const lazyNumberSpy = vi.fn((num: number): number => num)
    const lazyStringSpy = vi.fn((str: number): string => str.toString())
    const lazyNumber = new Lazy(() => lazyNumberSpy(0))
    const lazyString = lazyNumber.map(lazyStringSpy)

    it('должен создать новый экземпляр класса `Lazy`', () => {
      expect.hasAssertions()
      // @ts-expect-error Нарушить типизацию для тестирования.
      expect(lazyNumber !== lazyString).toBeTruthy()
    })

    it('не должен вычислить значение `lazyNumber` до чтения свойства `lazyString.value`', () => {
      expect.hasAssertions()
      expect(lazyNumberSpy).not.toHaveBeenCalled()
    })

    it('не должен вычислить значение `lazyString` до чтения свойства `lazyString.value`', () => {
      expect.hasAssertions()
      expect(lazyStringSpy).not.toHaveBeenCalled()
    })

    it('должен вычислить значение `lazyString` при чтении свойства `value`', () => {
      expect.hasAssertions()
      expect(lazyString.value, '1')
    })
  })
})
