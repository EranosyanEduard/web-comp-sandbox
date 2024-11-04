import _isEmpty from 'lodash-es/isEmpty'
import _noop from 'lodash-es/noop'
import { describe, expect, test, vi } from 'vitest'
import type { Typedef } from '../../utils'
import defineValidator from '../define_prop_validator'
import { PropTypeError } from '../errors'

describe('Тест функции `defineValidator`', () => {
  describe('Должен выполнить валидацию значения на основании определённой конфигурации', () => {
    interface TestCase {
      readonly config: {
        readonly type: Typedef.JavaScript.TypeConstructor
        readonly validatorArg: unknown
      }
      readonly expected: boolean
    }

    const arrayCases = [
      {
        expected: true,
        config: {
          type: Array,
          validatorArg: []
        }
      },
      {
        expected: false,
        config: {
          type: Array,
          validatorArg: ''
        }
      }
    ] as const satisfies TestCase[]
    const booleanCases = [
      {
        expected: true,
        config: {
          type: Boolean,
          validatorArg: false
        }
      },
      {
        expected: true,
        config: {
          type: Boolean,
          validatorArg: true
        }
      },
      {
        expected: false,
        config: {
          type: Boolean,
          validatorArg: ''
        }
      }
    ] as const satisfies TestCase[]
    const functionCases = [
      {
        expected: true,
        config: {
          type: Function,
          validatorArg: _noop
        }
      },
      {
        expected: false,
        config: {
          type: Function,
          validatorArg: ''
        }
      }
    ] as const satisfies TestCase[]
    const numberCases = [
      {
        expected: true,
        config: {
          type: Number,
          validatorArg: NaN
        }
      },
      {
        expected: false,
        config: {
          type: Number,
          validatorArg: ''
        }
      }
    ] as const satisfies TestCase[]
    const objectCases = [
      {
        expected: true,
        config: {
          type: Object,
          validatorArg: []
        }
      },
      {
        expected: true,
        config: {
          type: Object,
          validatorArg: {}
        }
      },
      {
        expected: false,
        config: {
          type: Object,
          validatorArg: ''
        }
      }
    ] as const satisfies TestCase[]
    const stringCases = [
      {
        expected: true,
        config: {
          type: String,
          validatorArg: ''
        }
      },
      {
        expected: false,
        config: {
          type: String,
          validatorArg: NaN
        }
      }
    ] as const satisfies TestCase[]
    const allCases = [...arrayCases, ...booleanCases, ...functionCases, ...numberCases, ...objectCases, ...stringCases]
    test.each(allCases)(
      'Должен выполнить валидацию значения типа $config.type -> $expected',
      ({ config: { type, validatorArg }, expected }) => {
        const validator = defineValidator({ type })
        if (expected) {
          expect(validator(validatorArg)).toBe(expected)
        } else {
          expect(() => validator(validatorArg)).toThrowError(PropTypeError)
        }
      }
    )
  })
  test('Должен определить функцию для валидации значения, соответствующего `union`-типу', () => {
    const numberCase = 0
    const stringCase = ''
    const validate = defineValidator({ type: [Number, String] })
    expect(validate(numberCase), 'значение типа number').toBeTruthy()
    expect(validate(stringCase), 'значение типа string').toBeTruthy()
    expect(() => validate(null), 'значение типа, отличного от number | string').toThrowError(PropTypeError)
  })
  test('Должен использовать пользовательскую функцию для валидации значения', () => {
    const negativeNumber = -1
    const positiveNumber = 1
    const zero = 0
    const isPositiveNumber = (number: number): boolean => number > zero
    const validate = defineValidator({ type: Number, validator: isPositiveNumber })
    expect(() => validate(negativeNumber), 'отрицательное число').toThrowError(PropTypeError)
    expect(() => validate(zero), '0').toThrowError(PropTypeError)
    expect(validate(positiveNumber), 'положительное число').toBeTruthy()
  })
  test('Не должен использовать пользовательскую функцию для валидации значения, если оно не соответствует объявленному типу', () => {
    const incompatibleType = 0
    const validator = vi.fn(_isEmpty)
    const validate = defineValidator({ type: String, validator })
    try {
      validate(incompatibleType)
    } catch (_) {
      expect(validator).not.toHaveBeenCalled()
    }
  })
})
