import _castArray from 'lodash-es/castArray'
import _isEmpty from 'lodash-es/isEmpty'
import type { Predicate } from '../helpers/typedef'
import { PropTypeError } from './errors'
import type { RuntimeType, ValidatorParams } from './typedef'
import DEFAULT_PROP_VALIDATORS from './validators'

/**
 * Определить валидатор для проверки значения _props_-а.
 * @param params - конфигурация валидатора
 */
function defineValidator<T extends RuntimeType>(
  params: ValidatorParams<T>
): Predicate<unknown> {
  const { type, validator = () => true } = params
  const validators = _castArray(type).flatMap(
    (propType) => DEFAULT_PROP_VALIDATORS.get(propType) ?? []
  )
  return (value) => {
    const isValidValueType =
      _isEmpty(validators) || validators.some((validate) => validate(value))
    // @ts-expect-error игнорировать ошибку типизации:
    // Если пользователь определил валидатор, то когда проверка значения дойдёт
    // до него, аргумент будет соответствовать типу, указанному в сигнатуре
    // такого валидатора.
    const isValidValue = isValidValueType && validator(value)
    if (isValidValue) return true
    throw new PropTypeError({ type, value })
  }
}

export default defineValidator
