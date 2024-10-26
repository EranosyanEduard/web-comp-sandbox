import { describe, expect, it, vi } from 'vitest'
import Lazy from '../Lazy'

describe('тест структуры данных `Lazy`', () => {
  it('не должен вычислять значение при вызове конструктора', () => {
    expect.hasAssertions()

    let fullName = 'Marty McFly'
    vi.fn(
      () =>
        new Lazy(() => {
          fullName = fullName.toLowerCase()
          return fullName
        })
    )()

    expect(fullName).toBe('Marty McFly')
  })

  it('должен вычислить значение при чтении свойства `value`', () => {
    expect.hasAssertions()

    let fullName = 'Marty McFly'

    expect(
      new Lazy(() => {
        fullName = fullName.toLowerCase()
        return fullName
      }).value
    ).toBe('marty mcfly')
  })

  it('должен вычислить значение при чтении свойства `value` однажды', () => {
    expect.hasAssertions()

    const zero = 0
    const one = 1
    let number = zero
    const lazy = new Lazy(() => ++number)

    expect(lazy.value).toBe(one)
    expect(lazy.value).toBe(one)
    expect(lazy.value).toBe(one)
  })

  describe('метод метода `map`', () => {
    const lazyNumberSpy = vi.fn((num: number): number => num)
    const lazyStringSpy = vi.fn((str: number): string => str.toString())
    const zero = 0
    const lazyNumber = new Lazy(() => lazyNumberSpy(zero))
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
