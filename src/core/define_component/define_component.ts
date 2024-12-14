import _mapValues from 'lodash-es/mapValues'
import { defineCustomElement } from '../define_custom_element'
import { processPropOptions } from '../define_prop'
import Component from './Component'
import type {
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
  const superComponentOptions = {
    propsConfigs: _mapValues(props, processPropOptions),
    setup,
    shadowRootConfig
  }
  const Component_ = class extends Component {
    constructor() {
      super(superComponentOptions)
    }
  }
  defineCustomElement(name, Component_)
  return Component_
}

export default defineComponent
