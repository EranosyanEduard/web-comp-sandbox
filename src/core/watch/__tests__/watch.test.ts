import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import { reactive } from '../../reactive'
import { ref } from '../../ref'
import watch from '../watch'

describe('тест функции `ref`', () => {
  it('должен установить наблюдение за реактивным значением', () => {
    expect.hasAssertions()

    vi.useFakeTimers()

    const comp = defineContext()
    const user = reactive({
      firstName: 'John',
      lastName: 'Doe'
    })
    const watcher = vi.fn()
    currentContext.set(comp)
    watch(user, watcher)
    user.firstName = 'Marty'
    user.lastName = 'McFly'

    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenLastCalledWith(
      {
        firstName: 'Marty',
        lastName: 'McFly'
      },
      {
        firstName: 'Marty',
        lastName: 'McFly'
      }
    )

    currentContext.set(null)
    vi.useRealTimers()
  })

  it('должен установить наблюдение за частным случаем реактивного значения', () => {
    expect.hasAssertions()

    vi.useFakeTimers()

    const comp = defineContext()
    const user = ref('John Doe')
    const watcher = vi.fn()
    currentContext.set(comp)
    watch(user, watcher)
    user.value = 'Marty McFly'
    user.value = 'John Doe'
    user.value = 'Marty McFly'

    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith('Marty McFly', 'John Doe')

    currentContext.set(null)
    vi.useRealTimers()
  })

  it('должен вызывать наблюдатель по требованию пользователя немедленно', () => {
    expect.hasAssertions()

    vi.useFakeTimers()

    const comp = defineContext()
    const user = ref('John Doe')
    const watcher = vi.fn()
    currentContext.set(comp)
    watch(user, watcher, { immediate: true })

    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith('John Doe', null)

    currentContext.set(null)
    vi.useRealTimers()
  })

  it('должен вызывать наблюдатель по требованию пользователя однажды', () => {
    expect.hasAssertions()

    vi.useFakeTimers()

    const comp = defineContext()
    const user = ref('John Doe')
    const watcher = vi.fn()
    currentContext.set(comp)
    watch(user, watcher, { once: true })
    user.value = 'Marty McFly'

    vi.runAllTimers()
    user.value = 'Neo'
    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith('Marty McFly', 'John Doe')

    currentContext.set(null)
    vi.useRealTimers()
  })

  it('должен тщательно проверять значение по требованию пользователя однажды', () => {
    expect.hasAssertions()

    vi.useFakeTimers()

    const comp = defineContext()
    const user = ref({ fullName: 'John Doe' })
    const watcher = vi.fn()
    currentContext.set(comp)
    watch(user, watcher, { deep: true })
    user.value = { fullName: 'Marty McFly' }

    vi.runAllTimers()
    user.value = { fullName: 'Marty McFly' }
    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith({ fullName: 'Marty McFly' }, { fullName: 'John Doe' })

    currentContext.set(null)
    vi.useRealTimers()
  })
})
