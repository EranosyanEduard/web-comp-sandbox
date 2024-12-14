import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import onMounted from '../on_mounted'

describe('тестовый набор функции `onMounted`', () => {
  it('должен подписаться на создание компонента', () => {
    expect.hasAssertions()

    /* before */
    const context = defineContext()
    currentContext.set(context)

    /* test */
    const whenMounted1 = vi.fn()
    const whenMounted2 = vi.fn()
    onMounted(whenMounted1)
    onMounted(whenMounted2)

    expect(context.whenMounted).toHaveBeenCalledTimes(2)

    const callArgs1 = vi.mocked(context.whenMounted).mock.calls.at(0) ?? []
    const callArgs2 = vi.mocked(context.whenMounted).mock.lastCall ?? []

    expect(callArgs1).toHaveLength(1)
    expect(callArgs2).toHaveLength(1)

    const [onMountedA = vi.fn()] = callArgs1
    const [onMountedB = vi.fn()] = callArgs2

    onMountedA()
    onMountedB()

    expect(whenMounted1).toHaveBeenCalledOnce()
    expect(whenMounted2).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
  })
})
