import { describe, expect, test } from 'vitest'
import uniqueComponentName from '../unique_component_name'

describe('Тест функции `uniqueComponentName`', () => {
  test('Должен создать уникальное название компонента', () => {
    const names: ReadonlySet<string> = new Set([uniqueComponentName(), uniqueComponentName(), uniqueComponentName()])
    const expectedNamesSize = 3
    expect(names).toHaveLength(expectedNamesSize)
  })
  test('Должен использовать название компонента `component`, если оно не определено', () => {
    const nameRegExp = /^component-\d+$/
    expect(uniqueComponentName(), 'по умолчанию').toMatch(nameRegExp)
    expect(uniqueComponentName(''), 'пустая строка').toMatch(nameRegExp)
    expect(uniqueComponentName('   '), 'строка, содержащая только пробелы').toMatch(nameRegExp)
  })
  test('Должен преобразовать название компонента в `kebab-case`', () => {
    expect(uniqueComponentName('VBtn')).toMatch(/^v-btn-\d+$/)
  })
})
