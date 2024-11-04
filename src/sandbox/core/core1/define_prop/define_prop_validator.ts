import _castArray from 'lodash-es/castArray'
import _isArray from 'lodash-es/isArray'
import _isBoolean from 'lodash-es/isBoolean'
import _isEmpty from 'lodash-es/isEmpty'
import _isFunction from 'lodash-es/isFunction'
import _isNumber from 'lodash-es/isNumber'
import _isObject from 'lodash-es/isObject'
import _isString from 'lodash-es/isString'
import { PropTypeError } from './errors'
import type { Predicate } from '../helpers/typedef'
import type { RuntimeType, ValidatorParams } from './typedef'

/**
 * Коллекция основных валидаторов для проверки соответствия между типами
 * и значениями _props_-ов.
 */
const DEFAULT_PROP_VALIDATORS: ReadonlyMap<
  Typedef.JavaScript.TypeConstructor,
  Typedef.Utils.Predicate<unknown>
> = new Map<
  Typedef.JavaScript.TypeConstructor,
  Typedef.Utils.Predicate<unknown>
>([
  [Array, _isArray],
  [Boolean, _isBoolean],
  [Function, _isFunction],
  [Number, _isNumber],
  [Object, _isObject],
  [String, _isString]
])

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
    // @ts-expect-error Если пользователь определил валидатор, то когда
    // проверка значения дойдёт до него, аргумент будет соответствовать типу,
    // указанному в сигнатуре такого валидатора.
    const isValidValue: boolean = isValidValueType && validator(value)
    if (!isValidValue) {
      throw new PropTypeError({ type, value })
    }
    return true
  }
}

export default defineValidator
