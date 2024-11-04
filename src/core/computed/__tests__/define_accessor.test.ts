import { describe, expect, it, vi } from 'vitest'
import { ReadonlyPropertyError } from '../../helpers/error'
import type { Accessor } from '../../helpers/typedef'
import defineAccessor from '../define_accessor'

describe('тестовый набор функции `defineAccessor`', () => {
  it('должен создать свойство доступа из геттера', () => {
    expect.hasAssertions()

    const getter: Accessor<string>['get'] = vi.fn()
    const accessor = defineAccessor(getter)

    expect(accessor.get).toStrictEqual(getter)
    expect(() => {
      accessor.set('bar')
    }).toThrow(new ReadonlyPropertyError({ property: 'value' }))
  })

  it('должен вернуть свойство доступа в исходном виде, если оно получено в качестве аргумента', () => {
    expect.hasAssertions()

    const accessor: Accessor<string> = { get: vi.fn(), set: vi.fn() }

    expect(accessor === defineAccessor(accessor)).toBeTruthy()
  })
})
