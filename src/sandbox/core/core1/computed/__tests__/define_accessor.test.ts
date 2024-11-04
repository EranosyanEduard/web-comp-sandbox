import _noop from 'lodash-es/noop'
import { describe, expect, it } from 'vitest'
import { ReadonlyPropertyError } from '../../helpers/error'
import type { Accessor } from '../../helpers/typedef'
import defineAccessor from '../define_accessor'

describe('тест функции `defineAccessor`', () => {
  it('должен создать свойство доступа из геттера', () => {
    expect.hasAssertions()

    const lazyValue: Accessor<string>['get'] = () => ''
    const accessor = defineAccessor(lazyValue)

    expect(accessor.get).toStrictEqual(lazyValue)
    expect(() => {
      accessor.set('bar')
    }).toThrow(new ReadonlyPropertyError({ property: 'value' }))
  })

  it('должен вернуть свойство доступа в исходном виде, если оно получено в качестве аргумента', () => {
    expect.hasAssertions()

    const accessor: Accessor<string> = { get: () => '', set: _noop }

    expect(accessor).toStrictEqual(defineAccessor(accessor))
  })
})
