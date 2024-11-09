import { describe, expect, it } from 'vitest'
import defineDefaultValue from '../define_prop_default_value'

describe('тестовый набор функции `defineValidator`', () => {
  it(`должен выбросить ошибку при использовании значения props-а по умолчанию,
    если он - обязательный`, () => {
    expect.hasAssertions()

    expect(() => {
      defineDefaultValue({
        name: 'type',
        default: () => 'text',
        required: true
      })()
    }).toThrow('Значение обязательного props-а type не определено')
  })

  it(`должен вернуть значение props-а по умолчанию, если оно определено,
    а props - необязательный`, () => {
    expect.hasAssertions()

    expect(
      defineDefaultValue({
        name: 'type',
        default: () => 'text'
      })()
    ).toBe('text')
  })

  it(`должен выбросить ошибку при использовании значения props-а по умолчанию,
    если оно не определено, а props - необязательный`, () => {
    expect.hasAssertions()

    expect(() => {
      defineDefaultValue({ name: 'type' })()
    }).toThrow('Значение props-а type по умолчанию не определено')
  })
})
