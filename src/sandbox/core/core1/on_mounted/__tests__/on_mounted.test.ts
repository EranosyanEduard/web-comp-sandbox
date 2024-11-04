import _noop from 'lodash-es/noop'
import { describe, expect, it, vi } from 'vitest'
import { accessor } from '../../current_instance'
import { defineInstance } from '../../helpers/test'
import onMounted from '../on_mounted'

describe('тест функции `onMounted`', () => {
  it('должен подписаться на создание компонента', () => {
    expect.hasAssertions()

    const logSpy = vi.spyOn(console, 'log').mockImplementation(_noop)
    const comp = defineInstance()
    accessor.set(comp)

    onMounted(() => {
      console.log('1')
    })
    onMounted(() => {
      console.log('2')
    })

    expect(comp.whenMounted).toHaveBeenCalledTimes(2)
    expect(comp.whenMounted.mock.calls.at(0)).toHaveLength(1)
    expect(comp.whenMounted.mock.lastCall).toHaveLength(1)

    const [onMountedA] = comp.whenMounted.mock.calls.at(0) ?? []
    const [onMountedB] = comp.whenMounted.mock.lastCall ?? []

    onMountedA()

    expect(logSpy).toHaveBeenCalledWith('1')

    onMountedB()

    expect(logSpy).toHaveBeenCalledWith('2')

    accessor.set(null)
  })
})
