import _noop from 'lodash-es/noop'
import _uniqueId from 'lodash-es/uniqueId'
import { afterEach, beforeAll, beforeEach, describe, expect, type MockInstance, test, vi } from 'vitest'
import { currentInstance, type CurrentInstanceTypedef } from '../../current_instance'
import { type DefineComponentTypedef, defineComputedStore } from '../../define_component'
import { defineCustomElement } from '../../define_custom_element'
import reactive from '../reactive'

describe('Тест функции `reactive`', () => {
  const Component = class extends HTMLElement implements NonNullable<CurrentInstanceTypedef.CurrentInstance> {
    readonly computedStore: DefineComponentTypedef.ComputedStore = defineComputedStore()
    readonly requestRender: VoidFunction = _noop
  }
  let requestRenderSpy: MockInstance | null = null

  beforeAll(() => {
    defineCustomElement(_uniqueId('TestComponent'), Component)
  })
  beforeEach(() => {
    const component = new Component()
    requestRenderSpy = vi.spyOn(component, 'requestRender')
    currentInstance.set(component)
  })
  afterEach(() => {
    currentInstance.set(null)
  })

  test('Должен создать точную "копию" пользовательского объекта', () => {
    expect(reactive({ foo: 'foo' })).toEqual({ foo: 'foo' })
  })
  test('Должен потребовать рендер компонента при изменении значения свойства объекта', () => {
    const values = reactive({ foo: 'foo' })
    values.foo = 'bar'
    expect(values).toEqual({ foo: 'bar' })
    expect(requestRenderSpy).toHaveBeenCalledOnce()
  })
  test('Не должен потребовать рендер компонента, если значение свойства объекта не изменилось', () => {
    const values = reactive({ foo: 'foo' })
    values.foo = 'foo'
    expect(values).toEqual({ foo: 'foo' })
    expect(requestRenderSpy).not.toHaveBeenCalledOnce()
  })
})
