import { render } from 'lit-html'
import _debounce from 'lodash-es/debounce'
import _forEach from 'lodash-es/forEach'
import _isElement from 'lodash-es/isElement'
import _isFunction from 'lodash-es/isFunction'
import _isObject from 'lodash-es/isObject'
import _mapValues from 'lodash-es/mapValues'
import type { Head } from 'ts-essentials'
import {
  type Context as IContext,
  Ctx as Context,
  currentContext
} from '../current_context'
import { defineCustomElement } from '../define_custom_element'
import { processPropOptions } from '../define_prop'
import defineEventConfig from './define_event_config'
import type {
  Component as IComponent,
  ComponentConstructor,
  ComponentOptions,
  SuperProps
} from './typedef'

/**
 * Определить _веб-компонент_.
 * @param options - конфигурация компонента
 * @throws {DOMException} см. {@link defineCustomElement}
 * @throws {SyntaxError} см. {@link defineCustomElement}
 */
function defineComponent<
  Props extends SuperProps,
  EventType extends string = string
>(options: ComponentOptions<Props, EventType>): ComponentConstructor {
  const { name, props, setup, shadowRootConfig } = options
  const propsConfigs = _mapValues(props, processPropOptions)
  const Component = class extends HTMLElement implements IComponent {
    readonly requestRender: VoidFunction
    readonly #context: Context

    constructor() {
      super()
      this.#context = new Context({
        containsContext: (context) => {
          // @ts-expect-error игнорировать ошибку типизации:
          // вызов `_isElement(context)` гарантирует, что `context` соответствует
          // требованиям, предъявляемым к параметру метода `this.contains`.
          return _isElement(context) && this.contains(context)
        }
      })
      const root = this.#defineRoot()
      const template = this.#defineTemplate()
      this.requestRender = _debounce(() => {
        this.#context.requestRender()
        render(template(), root)
      })
    }

    containsContext(context: IContext): boolean {
      return this.#context.containsContext(context)
    }

    connectedCallback(): void {
      this.#context.mount()
      this.requestRender()
    }

    disconnectedCallback(): void {
      this.#context.destroy()
    }

    whenDestroyed(cb: VoidFunction): void {
      this.#context.whenDestroyed(cb)
    }

    whenMounted(cb: VoidFunction): void {
      this.#context.whenMounted(cb)
    }

    whenRequestedRender(cb: VoidFunction): void {
      this.#context.whenRequestedRender(cb)
    }

    #defineProp<K extends keyof Props>(
      name: K,
      config: (typeof propsConfigs)[K]
    ): void {
      const { default: lazyDefault, reflector = null, validator } = config
      const setAttribute: VoidFunction = () => {
        if (!_isFunction(reflector)) return
        // @ts-expect-error игнорировать ошибку типизации:
        // невозможно обеспечить соответствие типов.
        this.setAttribute(name, reflector(this[name]))
      }
      let prevValue: Head<Parameters<typeof validator>> | null = null
      Reflect.defineProperty(this, name, {
        get: (): typeof prevValue => prevValue ?? lazyDefault(),
        set: (next: typeof prevValue) => {
          const nextValue = next ?? lazyDefault()
          if (validator(nextValue) && prevValue !== nextValue) {
            prevValue = nextValue
            setAttribute()
            this.requestRender()
          }
        }
      })
      setAttribute()
    }

    #defineProps(): Head<Parameters<typeof setup>> {
      _forEach(propsConfigs, (config, name) => {
        this.#defineProp(name, config)
      })
      // @ts-expect-error игнорировать ошибку типизации:
      // невозможно обеспечить соответствие типов.
      return this
    }

    #defineRoot(): this | ShadowRoot {
      return _isObject(shadowRootConfig)
        ? this.attachShadow(shadowRootConfig)
        : this
    }

    #defineTemplate(): ReturnType<typeof setup> {
      currentContext.set(this)
      const props = this.#defineProps()
      const defineTemplate = setup(props, {
        element: this,
        emit: (...args: unknown[]) => {
          const { type, eventInit } = defineEventConfig(...args)
          this.dispatchEvent(new CustomEvent(type, eventInit))
        }
      })
      currentContext.set(null)
      return defineTemplate
    }
  }
  defineCustomElement(name, Component)
  return Component
}

export default defineComponent
