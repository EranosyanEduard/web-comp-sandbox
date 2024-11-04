import _kebabCase from 'lodash-es/kebabCase'
import _keys from 'lodash-es/keys'
import _mapValues from 'lodash-es/mapValues'
import { defineCustomElement } from '../define_custom_element'
import { processPropOptions } from '../define_props'
import type { type } from '../utils'
import type {
  ComponentConstructor,
  ComponentOptions,
  PropsConfigs,
  SuperProps
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
  const { name, props = {}, setup } = options
  const propsConfigs = _mapValues(props, processPropOptions)
  const isProp: type.utils.Predicate<PropertyKey> = (propName) => {
    return Object.hasOwn(propsConfigs, propName)
  }
  const Component = class extends HTMLElement {
    static readonly observedAttributes = _keys(props).map(_kebabCase)

    readonly propsConfigs: PropsConfigs<Props>

    constructor() {
      super()
      this.propsConfigs = this._defineProps()
      setup(this.propsConfigs)
    }

    private _defineProps(): PropsConfigs<Props> {
      // @ts-expect-error Коллекция значений props-ов.
      const propsValues: ReturnType<typeof this._defineProps> = {}
      return new Proxy(propsValues, {
        get: (values, propName) => {
          if (!isProp(propName)) return
          const name = propName as keyof typeof propsConfigs
          return values[name] ?? propsConfigs[name].default()
        },
        set: (values, propName, propValue: never) => {
          if (!isProp(propName)) return false
          const propName_ = propName as keyof typeof propsConfigs
          if (!propsConfigs[propName_].validator(propValue)) return false
          values[propName_] = propValue
          return true
        }
      })
    }
  }
  return defineCustomElement(name, Component)
}

export default defineComponent
