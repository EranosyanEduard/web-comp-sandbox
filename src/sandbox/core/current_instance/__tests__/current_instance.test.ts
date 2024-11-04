import _noop from 'lodash-es/noop'
import _uniqueId from 'lodash-es/uniqueId'
import { describe, expect, test } from 'vitest'
import { type DefineComponentTypedef, defineComputedStore } from '../../define_component'
import { defineCustomElement } from '../../define_custom_element'
import currentInstance from '../current_instance'
import type { CurrentInstance } from '../typedef'

describe('Тест интерфейса `currentInstance`', () => {
  test('Должен использовать в качестве экземпляра компонента по умолчанию `null`', () => {
    expect(currentInstance.get()).toBeNull()
  })
  test('Должен записать и прочитать инициализируемый экземпляр компонента', () => {
    const CompA = class extends HTMLElement implements NonNullable<CurrentInstance> {
      readonly computedStore: DefineComponentTypedef.ComputedStore = defineComputedStore()
      readonly requestRender: VoidFunction = _noop
    }
    const CompB = class extends HTMLElement implements NonNullable<CurrentInstance> {
      readonly computedStore: DefineComponentTypedef.ComputedStore = defineComputedStore()
      readonly requestRender: VoidFunction = _noop
    }
    defineCustomElement(_uniqueId('CompA'), CompA)
    defineCustomElement(_uniqueId('CompB'), CompB)
    const compA = new CompA()
    const compB = new CompB()
    currentInstance.set(compA)
    expect(currentInstance.get()).toBe(compA)
    currentInstance.set(compB)
    expect(currentInstance.get()).toBe(compB)
    currentInstance.set(null)
    expect(currentInstance.get()).toBeNull()
  })
})
