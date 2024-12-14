import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import { reactive } from '../../reactive'
import { ref } from '../../ref'
import watch from '../watch'
import { computed } from '../../computed'

describe('тестовый набор функции `ref`', () => {
  it('должен установить наблюдение за реактивным значением', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    const watcher = vi.fn()
    currentContext.set(context)

    /* test */
    const user = reactive({
      firstName: 'John',
      lastName: 'Doe'
    })
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

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })

  it('должен установить наблюдение за частным случаем реактивного значения', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    const watcher = vi.fn()
    currentContext.set(context)

    /* test */
    const user = ref('John Doe')
    watch(user, watcher)
    user.value = 'Marty McFly'
    user.value = 'John Doe'
    user.value = 'Marty McFly'

    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith('Marty McFly', 'John Doe')

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })

  it('должен установить наблюдение за вычисляемым значением', () => {
    expect.hasAssertions()

    const context = defineContext()
    currentContext.set(context)
    const watcher = vi.fn()

    const firstName = ref('John')
    const lastName = ref('Doe')
    const fullName = computed<string>(
      () => `${firstName.value} ${lastName.value}`
    )
    const [onchange = vi.fn()] = context.whenRequestedRender.mock.lastCall ?? []
    watch(fullName, watcher)
    firstName.value = 'Marty'
    lastName.value = 'McFly'
    onchange()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith('Marty McFly', 'John Doe')

    currentContext.set(null)
  })

  it('должен вызывать наблюдатель по требованию пользователя немедленно', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    const watcher = vi.fn()
    currentContext.set(context)

    /* test */
    const user = ref('John Doe')
    watch(user, watcher, { immediate: true })

    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith('John Doe', null)

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })

  it('должен вызывать наблюдатель по требованию пользователя однажды', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    const watcher = vi.fn()
    currentContext.set(context)

    /* test */
    const user = ref('John Doe')
    watch(user, watcher, { once: true })
    user.value = 'Marty McFly'

    vi.runAllTimers()
    user.value = 'Neo'
    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith('Marty McFly', 'John Doe')

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })

  it('должен тщательно проверять значение по требованию пользователя', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    const watcher = vi.fn()
    currentContext.set(context)

    /* test */
    const user = ref({ fullName: 'John Doe' })
    watch(user, watcher, { deep: true })
    user.value = { fullName: 'Marty McFly' }

    vi.runAllTimers()
    user.value = { fullName: 'Marty McFly' }
    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith(
      { fullName: 'Marty McFly' },
      { fullName: 'John Doe' }
    )

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })

  it('должен прекращать наблюдение за значением по требованию пользователя', () => {
    expect.hasAssertions()

    /* before */
    vi.useFakeTimers()
    const context = defineContext()
    const watcher = vi.fn()
    currentContext.set(context)

    /* test */
    const user = ref('John Doe')
    const stop = watch(user, watcher)
    user.value = 'Marty McFly'
    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith('Marty McFly', 'John Doe')

    stop()
    user.value = 'John Doe'
    vi.runAllTimers()

    expect(watcher).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
    vi.useRealTimers()
  })
})
