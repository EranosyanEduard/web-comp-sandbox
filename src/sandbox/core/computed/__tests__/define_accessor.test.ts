import _noop from 'lodash-es/noop'
import { describe, expect, test } from 'vitest'
import { Exception, type Typedef } from '../../utils'
import defineAccessor from '../define_accessor'

describe('Тест функции `defineAccessor`', () => {
  test('Должен создать свойство доступа из геттера', () => {
    const lazyValue: Typedef.Utils.LazyValue<string> = () => ''
    const accessor = defineAccessor(lazyValue)
    expect(accessor.get).toEqual(lazyValue)
    expect(() => {
      accessor.set('bar')
    }).toThrowError(new Exception.ReadonlyPropertyError({ property: 'value' }))
  })
  test('Должен вернуть свойство доступа в исходном виде, если оно получено в качестве аргумента', () => {
    const accessor: Typedef.Utils.Accessor<string> = { get: () => '', set: _noop }
    expect(accessor).toEqual(defineAccessor(accessor))
  })
})
