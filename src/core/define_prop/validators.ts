import _isArray from 'lodash-es/isArray'
import _isBoolean from 'lodash-es/isBoolean'
import _isFunction from 'lodash-es/isFunction'
import _isNumber from 'lodash-es/isNumber'
import _isObject from 'lodash-es/isObject'
import _isString from 'lodash-es/isString'
import type { Predicate, TypeConstructor } from '../helpers/typedef'

/**
 * Коллекция основных валидаторов для проверки соответствия между типами
 * и значениями _props_-ов.
 */
const DEFAULT_PROP_VALIDATORS: ReadonlyMap<
  TypeConstructor,
  Predicate<unknown>
> = new Map<TypeConstructor, Predicate<unknown>>([
  [Array, _isArray],
  [Boolean, _isBoolean],
  [Function, _isFunction],
  [Number, _isNumber],
  [Object, _isObject],
  [String, _isString]
])

export default DEFAULT_PROP_VALIDATORS
