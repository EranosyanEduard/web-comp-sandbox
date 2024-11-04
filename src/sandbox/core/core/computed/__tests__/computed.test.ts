import { describe, expect, it } from 'vitest'
import { currentContext } from '../../current_context'
import { defineContext } from '../../helpers/test'
import { ref } from '../../ref'
import computed from '../computed'

describe('тест функции `computed`', () => {
  it('должен подписаться на обновление и уничтожение компонента', () => {
    expect.hasAssertions()

    const comp = defineContext()
    currentContext.set(comp)
    computed(() => '')

    expect(comp.whenDestroyed).toHaveBeenCalledOnce()
    expect(comp.whenDestroyed.mock.lastCall).toHaveLength(1)
    expect(comp.whenRequestedRender).toHaveBeenCalledOnce()
    expect(comp.whenRequestedRender.mock.lastCall).toHaveLength(1)

    const [onWhenDestroyed] = comp.whenDestroyed.mock.lastCall ?? []
    const [onWhenRequestedRender] = comp.whenRequestedRender.mock.lastCall ?? []

    expect(onWhenDestroyed).toBeTypeOf('function')
    expect(onWhenRequestedRender).toBeTypeOf('function')

    currentContext.set(null)
  })

  it('должен создать вычисляемое свойство из геттера', () => {
    expect.hasAssertions()

    const comp = defineContext()
    currentContext.set(comp)
    const firstName = ref('John')
    const lastName = ref('Doe')
    const fullName = computed<string>(() => `${firstName.value} ${lastName.value}`)
    const [whenRequestedRender] = comp.whenRequestedRender.mock.lastCall ?? []

    expect(fullName.value).toBe('John Doe')

    firstName.value = 'Marty'
    whenRequestedRender()

    expect(fullName.value).toBe('Marty Doe')

    lastName.value = 'McFly'
    whenRequestedRender()

    expect(fullName.value).toBe('Marty McFly')

    currentContext.set(null)
  })

  it('должен создать вычисляемое свойство из свойства доступа', () => {
    expect.hasAssertions()

    const comp = defineContext()
    currentContext.set(comp)
    const user = ref({ firstName: 'John', lastName: 'Doe' })
    const fullName = computed<string>({
      get: () => `${user.value.firstName} ${user.value.lastName}`,
      set: (value) => {
        const [firstName, lastName] = value.split(' ')
        user.value = { firstName, lastName }
      }
    })
    const [whenRequestedRender] = comp.whenRequestedRender.mock.lastCall ?? []

    expect(fullName.value).toBe('John Doe')

    fullName.value = 'Marty McFly'
    whenRequestedRender()

    expect(fullName.value).toBe('Marty McFly')
    expect(user.value).toStrictEqual({ firstName: 'Marty', lastName: 'McFly' })

    currentContext.set(null)
  })

  it('должен позволять управлять контекстом выполнения, добавляя и удаляя из него компоненты', () => {
    expect.hasAssertions()

    const compA = defineContext()
    const compB = defineContext()
    const user = ref({ firstName: 'John', lastName: 'Doe' })
    const userName = computed<string>(() => `${user.value.firstName} ${user.value.lastName}`)
    computed.store.get(userName)?.useContext(compA, compB)
    const [onWhenDestroyedA] = compA.whenDestroyed.mock.lastCall ?? []
    const [onWhenRequestedRenderA] = compA.whenRequestedRender.mock.lastCall ?? []
    const [onWhenRequestedRenderB1] = compB.whenRequestedRender.mock.lastCall ?? []

    expect(onWhenRequestedRenderB1).toBeUndefined()

    user.value = { firstName: 'Marty', lastName: 'McFly' }
    onWhenRequestedRenderA()

    expect(userName.value).toBe('Marty McFly')

    user.value = { firstName: 'John', lastName: 'Doe' }
    onWhenRequestedRenderA()

    expect(userName.value).toBe('John Doe')

    onWhenDestroyedA()
    const [whenRequestedRenderB2] = compB.whenRequestedRender.mock.lastCall ?? []
    user.value = { firstName: 'Marty', lastName: 'McFly' }
    whenRequestedRenderB2()

    expect(userName.value).toBe('Marty McFly')
  })
})
