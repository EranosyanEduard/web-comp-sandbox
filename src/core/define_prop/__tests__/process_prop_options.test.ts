import _isEmpty from 'lodash-es/isEmpty'
import { describe, expect, it, vi } from 'vitest'
import type { Accessor, Predicate } from '../../helpers/typedef'
import defineDefaultValue from '../define_prop_default_value'
import defineValidator from '../define_prop_validator'
import processPropOptions from '../process_prop_options'

vi.mock('../define_prop_validator', () => ({ default: vi.fn() }))
vi.mock('../define_prop_default_value', () => ({ default: vi.fn() }))

describe('тестовый набор функции `processPropOptions`', () => {
  it('должен обработать конфигурацию props-а с помощью функций `defineValidator` и `defineDefaultValue`', () => {
    expect.hasAssertions()

    const lazyDefault: Accessor<string>['get'] = () => 'text'
    const validator: Predicate<string> = (value) => !_isEmpty(value)
    processPropOptions(
      {
        type: String,
        default: lazyDefault,
        required: false,
        validator
      },
      'inputType'
    )

    expect(defineDefaultValue).toHaveBeenCalledOnce()
    expect(defineDefaultValue).toHaveBeenCalledWith({
      default: lazyDefault,
      name: 'inputType',
      required: false
    })
    expect(defineValidator).toHaveBeenCalledOnce()
    expect(defineValidator).toHaveBeenCalledWith({ type: String, validator })
  })
})
