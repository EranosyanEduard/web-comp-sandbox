import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import onDestroyed from '../on_destroyed'

describe('тест функции `onDestroyed`', () => {
  it('должен подписаться на уничтожение компонента', () => {
    expect.hasAssertions()

    /* before */
    const context = defineContext()
    currentContext.set(context)

    /* test */
    const whenDestroyed1 = vi.fn()
    const whenDestroyed2 = vi.fn()
    onDestroyed(whenDestroyed1)
    onDestroyed(whenDestroyed2)

    expect(context.whenDestroyed).toHaveBeenCalledTimes(2)

    const callArgs1 = vi.mocked(context.whenDestroyed).mock.calls.at(0) ?? []
    const callArgs2 = vi.mocked(context.whenDestroyed).mock.lastCall ?? []

    expect(callArgs1).toHaveLength(1)
    expect(callArgs2).toHaveLength(1)

    const [onDestroyedA = vi.fn()] = callArgs1
    const [onDestroyedB = vi.fn()] = callArgs2

    onDestroyedA()
    onDestroyedB()

    expect(whenDestroyed1).toHaveBeenCalledOnce()
    expect(whenDestroyed2).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
  })
})
