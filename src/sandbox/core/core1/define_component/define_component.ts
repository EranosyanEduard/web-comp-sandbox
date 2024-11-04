import { render } from 'lit-html'
import _debounce from 'lodash-es/debounce'
import _mapValues from 'lodash-es/mapValues'
import _reduce from 'lodash-es/reduce'
import type { Head } from 'ts-essentials'
import { currentInstance } from '../current_instance'
import { defineCustomElement } from '../define_custom_element'
import defineComputedStore from './define_computed_store'
import { processPropOptions } from '../define_prop'
import type {
  Component as IComponent,
  ComponentConstructor,
  ComponentOptions,
  SuperProps,
  ComputedStore
} from './typedef'

/**
 * Определить _веб-компонент_.
 * @param options - конфигурация компонента
 * @throws {DOMException} см. {@link defineCustomElement}
 * @throws {SyntaxError} см. {@link defineCustomElement}
 */
function defineComponent<Props extends SuperProps>(
  options: ComponentOptions<Props>
): ComponentConstructor {
  const { name, props, setup } = options
  const propsConfigs = _mapValues(props, processPropOptions)
  const Component = class extends HTMLElement implements IComponent {
    readonly computedStore: Pick<ComputedStore, 'subscribe'>

    readonly requestRender: VoidFunction

    constructor() {
      super()
      const computedStore = defineComputedStore()
      const template = this.#defineTemplate(this.#defineProps())
      this.computedStore = computedStore
      this.requestRender = _debounce(() => {
        computedStore.evaluate()
        render(template(), this)
      })
    }

    connectedCallback(): void {
      this.requestRender()
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
        // @ts-expect-error Объявить свойство `this[name]` в методе
        // `#defineProp`.
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

    #defineTemplate(
      props: Head<Parameters<typeof setup>>
    ): ReturnType<typeof setup> {
      currentInstance.set(this)
      const defineTemplate = setup(props, { element: this })
      currentInstance.set(null)
      return defineTemplate
    }
  }
  defineCustomElement(name, Component)
  return Component
}

export default defineComponent
