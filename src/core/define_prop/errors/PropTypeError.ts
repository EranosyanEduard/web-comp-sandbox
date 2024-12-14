import _castArray from 'lodash-es/castArray'
import type { RuntimeType } from '../typedef'

/** Ошибка "Значение _props_-а не соответствует его типу" */
class PropTypeError extends Error {
  constructor(params: Readonly<{ type: RuntimeType; value: unknown }>) {
    const { type, value } = params
    const error = {
      expectedTypes: _castArray(type).map(({ name }) => name.toLowerCase()),
      received: { type: typeof value, value: JSON.stringify(value) }
    } as const
    super(JSON.stringify(error, undefined, '\t'))
    this.name = 'PropTypeError'
  }
}

export default PropTypeError
