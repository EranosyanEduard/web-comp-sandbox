import _noop from 'lodash-es/noop'
import { describe, expect, it, vi } from 'vitest'
import { accessor } from '../../current_instance'
import { defineInstance } from '../../helpers/test'
import onDestroyed from '../on_destroyed'

describe('тест функции `onDestroyed`', () => {
  it('должен подписаться на создание компонента', () => {
    expect.hasAssertions()

    const logSpy = vi.spyOn(console, 'log').mockImplementation(_noop)
    const comp = defineInstance()
    accessor.set(comp)

    onDestroyed(() => {
      console.log('1')
    })
    onDestroyed(() => {
      console.log('2')
    })

    expect(comp.whenDestroyed).toHaveBeenCalledTimes(2)
    expect(comp.whenDestroyed.mock.calls.at(0)).toHaveLength(1)
    expect(comp.whenDestroyed.mock.lastCall).toHaveLength(1)

    const [onDestroyedA] = comp.whenDestroyed.mock.calls.at(0) ?? []
    const [onDestroyedB] = comp.whenDestroyed.mock.lastCall ?? []

    onDestroyedA()

    expect(logSpy).toHaveBeenCalledWith('1')

    onDestroyedB()

    expect(logSpy).toHaveBeenCalledWith('2')

    accessor.set(null)
  })
})
