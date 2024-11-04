import _isEmpty from 'lodash-es/isEmpty'
import { describe, expect, test, vi } from 'vitest'
import type { Typedef } from '../../utils'
import defineValidator from '../define_prop_validator'
import defineDefaultValue from '../define_prop_default_value'
import processPropOptions from '../process_prop_options'

vi.mock('../define_prop_validator', () => ({ default: vi.fn() }))
vi.mock('../define_prop_default_value', () => ({ default: vi.fn() }))

describe('Тест функции `processPropOptions`', () => {
  test('Должен обработать конфигурацию props-а с помощью функций `defineValidator` и `defineDefaultValue`', () => {
    const lazyDefault: Typedef.Utils.LazyValue<string> = () => 'text'
    const validator = (value: string): boolean => !_isEmpty(value)
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
