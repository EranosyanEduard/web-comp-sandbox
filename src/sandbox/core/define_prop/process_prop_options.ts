import defineDefaultValue from './define_prop_default_value'
import defineValidator from './define_prop_validator'
import type { PropOptions, RuntimeType } from './typedef'

/**
 * Создать конфигурацию _props_-а.
 * @param options - конфигурация _props-а_
 */
function processPropOptions<T extends RuntimeType>(
  options: PropOptions<T>,
  name: string
): Pick<Required<PropOptions<T>>, 'default' | 'validator'> {
  const { default: default_, required, type, validator: validator_ } = options
  const lazyDefault = defineDefaultValue({ default: default_, name, required })
  const validator = defineValidator({ type, validator: validator_ })
  return { default: lazyDefault, validator }
}

export default processPropOptions
