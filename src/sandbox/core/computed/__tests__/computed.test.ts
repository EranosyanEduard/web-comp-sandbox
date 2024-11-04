import _uniqueId from 'lodash-es/uniqueId'
import { afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { currentInstance, type CurrentInstanceTypedef } from '../../current_instance'
import { defineCustomElement } from '../../define_custom_element'
import { type DefineComponentTypedef, defineComputedStore } from '../../define_component'
import { ref } from '../../ref'
import computed from '../computed'

describe('Тест функции `computed`', () => {
  const Component = class extends HTMLElement implements NonNullable<CurrentInstanceTypedef.CurrentInstance> {
    readonly computedStore: Pick<DefineComponentTypedef.ComputedStore, 'subscribe'>
    readonly requestRender: VoidFunction

    constructor() {
      super()
      const computedStore = defineComputedStore()
      this.computedStore = computedStore
      this.requestRender = computedStore.evaluate
    }
  }

  beforeAll(() => {
    defineCustomElement(_uniqueId('TestComponent'), Component)
  })
  beforeEach(() => {
    currentInstance.set(new Component())
  })
  afterEach(() => {
    currentInstance.set(null)
  })

  test('Должен создать вычисляемое свойство из геттера', () => {
    const firstName = ref('John')
    const lastName = ref('Doe')
    const fullName = computed<string>(() => `${firstName.value} ${lastName.value}`)
    expect(fullName.value).toBe('John Doe')
    firstName.value = 'Marty'
    expect(fullName.value).toBe('Marty Doe')
    lastName.value = 'McFly'
    expect(fullName.value).toBe('Marty McFly')
  })
  test('Должен создать вычисляемое свойство из свойства доступа', () => {
    const user = ref({ firstName: 'John', lastName: 'Doe' })
    const fullName = computed<string>({
      get: () => `${user.value.firstName} ${user.value.lastName}`,
      set: (value) => {
        const [firstName, lastName] = value.split(' ')
        user.value = { firstName, lastName }
      }
    })
    expect(fullName.value).toBe('John Doe')
    fullName.value = 'Marty McFly'
    expect(fullName.value).toBe('Marty McFly')
    expect(user.value).toEqual({ firstName: 'Marty', lastName: 'McFly' })
  })
})
