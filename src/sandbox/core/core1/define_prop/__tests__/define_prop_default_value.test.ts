import { describe, expect, test } from 'vitest'
import defineDefaultValue from '../define_prop_default_value'

describe('Тест функции `defineValidator`', () => {
  test('Должен выбросить ошибку при использовании значения props-а по умолчанию, если он - обязательный', () => {
    const lazyValue = defineDefaultValue({
      name: 'type',
      default: () => 'text',
      required: true
    })
    expect(() => {
      lazyValue()
    }).toThrowError('Значение обязательного props-а type не определено')
  })
  test('Должен вернуть значение props-а по умолчанию, если оно определено, а props - необязательный', () => {
    const lazyValue = defineDefaultValue({ name: 'type', default: () => 'text' })
    expect(lazyValue()).toBe('text')
  })
  test('Должен выбросить ошибку при использовании значения props-а по умолчанию, если оно не определено, а props - необязательный', () => {
    const lazyValue = defineDefaultValue({ name: 'type' })
    expect(() => {
      lazyValue()
    }).toThrowError('Значение props-а type по умолчанию не определено')
  })
})
