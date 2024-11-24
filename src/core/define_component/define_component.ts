import { render } from 'lit-html'
import _debounce from 'lodash-es/debounce'
import _isElement from 'lodash-es/isElement'
import _isObject from 'lodash-es/isObject'
import _mapValues from 'lodash-es/mapValues'
import _reduce from 'lodash-es/reduce'
import type { Head } from 'ts-essentials'
import {
  type Context as IContext,
  Ctx as Context,
  currentContext
} from '../current_context'
import { defineCustomElement } from '../define_custom_element'
import { processPropOptions } from '../define_prop'
import { MyEvent } from '../emit'
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
      const template = this.#defineTemplate(this.#defineProps())
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
      const { default: lazyDefault, validator } = config
      let prevValue: Head<Parameters<typeof validator>> | null = null
      Reflect.defineProperty(this, name, {
        get: (): typeof prevValue => prevValue,
        set: (next: typeof prevValue) => {
          const nextValue = next ?? lazyDefault()
          if (validator(nextValue) && prevValue !== nextValue) {
            prevValue = nextValue
            this.requestRender()
          }
        }
      })
    }

    #definePropProxy<K extends keyof Props>(
      name: K,
      proxy: Head<Parameters<typeof setup>>
    ): void {
      Reflect.defineProperty(proxy, name, {
        // @ts-expect-error игнорировать ошибку типизации:
        // объявить свойство `this[name]` в методе `#defineProp`.
        get: (): (typeof proxy)[K] => this[name]
      })
    }

    #defineProps(): Head<Parameters<typeof setup>> {
      const props = {} as unknown as Head<Parameters<typeof setup>>
      return _reduce(
        propsConfigs,
        (acc, config, name) => {
          this.#defineProp(name, config)
          this.#definePropProxy(name, acc)
          return acc
        },
        props
      )
    }

    #defineRoot(): this | ShadowRoot {
      return _isObject(shadowRootConfig)
        ? this.attachShadow(shadowRootConfig)
        : this
    }

    #defineTemplate(
      props: Head<Parameters<typeof setup>>
    ): ReturnType<typeof setup> {
      currentContext.set(this)
      const defineTemplate = setup(props, {
        element: this,
        emit: (eventConfig) => {
          this.dispatchEvent(new MyEvent(eventConfig))
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
