import { describe, expect, it, vi } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import { ref } from '../../ref'
import computed from '../computed'

describe('тест функции `computed`', () => {
  it('должен подписаться на обновление компонента', () => {
    expect.hasAssertions()

    /* before */
    const context = defineContext()
    currentContext.set(context)

    /* test */
    computed(() => '')

    expect(context.whenRequestedRender).toHaveBeenCalledOnce()

    /* after */
    currentContext.set(null)
  })

  it('должен создать вычисляемое свойство из геттера', () => {
    expect.hasAssertions()

    /* before */
    const context = defineContext()
    currentContext.set(context)

    /* test */
    const firstName = ref('John')
    const lastName = ref('Doe')
    const fullName = computed<string>(() => `${firstName.value} ${lastName.value}`)
    const [whenRequestedRender = vi.fn()] = vi.mocked(context.whenRequestedRender).mock.lastCall ?? []

    expect(fullName.value).toBe('John Doe')

    firstName.value = 'Marty'
    whenRequestedRender()

    expect(fullName.value).toBe('Marty Doe')

    lastName.value = 'McFly'
    whenRequestedRender()

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
    const [whenRequestedRender = vi.fn()] = vi.mocked(comp.whenRequestedRender).mock.lastCall ?? []

    expect(fullName.value).toBe('John Doe')

    fullName.value = 'Marty McFly'
    whenRequestedRender()

    expect(fullName.value).toBe('Marty McFly')
    expect(user.value).toStrictEqual({ firstName: 'Marty', lastName: 'McFly' })

    /* after */
    currentContext.set(null)
  })
})
