import _noop from 'lodash-es/noop'
import _uniqueId from 'lodash-es/uniqueId'
import { afterEach, beforeAll, beforeEach, describe, expect, type MockInstance, test, vi } from 'vitest'
import { currentInstance, type CurrentInstanceTypedef } from '../../current_instance'
import { type DefineComponentTypedef, defineComputedStore } from '../../define_component'
import { defineCustomElement } from '../../define_custom_element'
import ref from '../ref'

describe('Тест функции `ref`', () => {
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

  test('Должен создать реактивное значение', () => {
    expect(ref('foo')).toEqual({ value: 'foo' })
  })
  test('Должен потребовать рендер компонента при изменении реактивного значения', () => {
    const value = ref('foo')
    value.value = 'bar'
    expect(value.value).toBe('bar')
    expect(requestRenderSpy).toHaveBeenCalledOnce()
  })
  test('Не должен потребовать рендер компонента, если реактивное значение не изменилось', () => {
    const value = ref('foo')
    value.value = 'foo'
    expect(value.value).toBe('foo')
    expect(requestRenderSpy).not.toHaveBeenCalledOnce()
  })
})
