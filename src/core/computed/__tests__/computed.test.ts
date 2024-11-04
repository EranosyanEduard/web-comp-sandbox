import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import { ref } from '../../ref'
import computed from '../computed'

describe('тестовый набор функции `computed`', () => {
  it('должен создать вычисляемое свойство из геттера', () => {
    expect.hasAssertions()

    /* before */
    const context = defineContext()
    currentContext.set(context)

    /* test */
    const firstName = ref('John')
    const lastName = ref('Doe')
    const fullName = computed<string>(
      () => `${firstName.value} ${lastName.value}`
    )
    const [onchange = vi.fn()] = context.whenRequestedRender.mock.lastCall ?? []

    expect(fullName.value).toBe('John Doe')

    firstName.value = 'Marty'
    onchange()

    expect(fullName.value).toBe('Marty Doe')

    lastName.value = 'McFly'
    onchange()

    expect(fullName.value).toBe('Marty McFly')

    /* after */
    currentContext.set(null)
  })

  it('должен создать вычисляемое свойство из свойства доступа', () => {
    expect.hasAssertions()

    /* before */
    const comp = defineContext()
    currentContext.set(comp)

    /* test */
    const user = ref({ firstName: 'John', lastName: 'Doe' })
    const fullName = computed<string>({
      get: () => `${user.value.firstName} ${user.value.lastName}`,
      set: (value) => {
        const [firstName, lastName] = value.split(' ')
        user.value = { firstName, lastName }
      }
    })
    const [onchange = vi.fn()] = comp.whenRequestedRender.mock.lastCall ?? []

    expect(fullName.value).toBe('John Doe')

    fullName.value = 'Marty McFly'
    onchange()

    expect(fullName.value).toBe('Marty McFly')
    expect(user.value).toStrictEqual({ firstName: 'Marty', lastName: 'McFly' })

    /* after */
    currentContext.set(null)
  })

  it('должен установить и прекратить наблюдение за значением', () => {
    expect.hasAssertions()

    /* before */
    const context = defineContext()
    const watcher = vi.fn()
    currentContext.set(context)

    /* test */
    const firstName = ref('John')
    const lastName = ref('Doe')
    const fullName = computed<string>(
      () => `${firstName.value} ${lastName.value}`
    )
    const [onchange = vi.fn()] = context.whenRequestedRender.mock.lastCall ?? []
    const stop =
      computed._INSTANCES.get(fullName)?.whenChanged(watcher) ?? vi.fn()

    firstName.value = 'Marty'
    lastName.value = 'McFly'
    onchange()

    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith({
      nextValue: 'Marty McFly',
      prevValue: 'John Doe'
    })

    stop()
    firstName.value = 'John'
    lastName.value = 'Doe'

    expect(watcher).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
  })
})
