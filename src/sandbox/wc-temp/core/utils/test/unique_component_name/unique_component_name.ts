import _isEmpty from 'lodash-es/isEmpty'
import _kebabCase from 'lodash-es/kebabCase'
import _uniqueId from 'lodash-es/uniqueId'

const DEFAULT_COMPONENT_NAME = 'component'

/**
 * Создать уникальное название _веб-компонента_.
 * @param name - название компонента
 */
function uniqueComponentName(name = DEFAULT_COMPONENT_NAME): string {
  const trimmedName = name.trim()
  const componentName = _isEmpty(trimmedName)
    ? DEFAULT_COMPONENT_NAME
    : trimmedName
  return _kebabCase(_uniqueId(componentName))
}

export default uniqueComponentName
