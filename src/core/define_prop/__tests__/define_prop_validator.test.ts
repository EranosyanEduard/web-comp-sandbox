import _isEmpty from 'lodash-es/isEmpty'
import { describe, expect, it, vi } from 'vitest'
import type { Predicate, TypeConstructor } from '../../helpers/typedef'
import defineValidator from '../define_prop_validator'
import { PropTypeError } from '../errors'

describe('тестовый набор функции `defineValidator`', () => {
  describe('должен выполнить валидацию значения на основании определённой конфигурации', () => {
    interface TestCase {
      readonly config: {
        readonly type: TypeConstructor
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
          validatorArg: vi.fn
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
    const allCases = [
      ...arrayCases,
      ...booleanCases,
      ...functionCases,
      ...numberCases,
      ...objectCases,
      ...stringCases
    ]

    it.each(allCases.filter(({ expected }) => expected))(
      'должен выполнить валидацию значения типа $config.type -> $expected (успех)',
      ({ config: { type, validatorArg }, expected }) => {
        expect.hasAssertions()

        expect(defineValidator({ type })(validatorArg)).toBe(expected)
      }
    )

    it.each(allCases.filter(({ expected }) => !expected))(
      'должен выполнить валидацию значения типа $config.type -> $expected (провал)',
      ({ config: { type, validatorArg } }) => {
        expect.hasAssertions()

        expect(() => defineValidator({ type })(validatorArg)).toThrow(
          PropTypeError
        )
      }
    )
  })

  it('должен определить функцию для валидации значения, соответствующего `union`-типу', () => {
    expect.hasAssertions()

    const numberCase = 0
    const stringCase = ''
    const validate = defineValidator({ type: [Number, String] })

    expect(validate(numberCase), 'значение типа number').toBeTruthy()
    expect(validate(stringCase), 'значение типа string').toBeTruthy()
    expect(
      () => validate(null),
      'значение типа, отличного от number | string'
    ).toThrow(PropTypeError)
  })

  it('должен использовать пользовательскую функцию для валидации значения', () => {
    expect.hasAssertions()

    const negativeNumber = -1
    const positiveNumber = 1
    const zero = 0
    const isPositiveNumber: Predicate<number> = (number) => number > zero
    const validate = defineValidator({
      type: Number,
      validator: isPositiveNumber
    })

    expect(() => validate(negativeNumber), 'отрицательное число').toThrow(
      PropTypeError
    )
    expect(() => validate(zero), '0').toThrow(PropTypeError)
    expect(validate(positiveNumber), 'положительное число').toBeTruthy()
  })

  it(`не должен использовать пользовательскую функцию для валидации значения,
    если оно не соответствует объявленному типу`, () => {
    expect.hasAssertions()

    const incompatibleType = 0
    const validator = vi.fn(_isEmpty)
    const validate = defineValidator({ type: String, validator })

    expect(() => validate(incompatibleType)).toThrow(PropTypeError)
    expect(validator).not.toHaveBeenCalled()
  })
})
