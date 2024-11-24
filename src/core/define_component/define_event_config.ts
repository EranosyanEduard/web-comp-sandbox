import _isObject from 'lodash-es/isObject'
import _isString from 'lodash-es/isString'
import { ArgumentError } from '../helpers/error'
import type { EventConfig } from './typedef'

/**
 * Определить конфигурацию пользовательского события,
 * которую использует ф-я `emit` _веб-компонента_.
 * @param args - аргументы ф-ии `emit`
 * @throws {ArgumentError} аргументы ф-ии `emit` нарушают её сигнатуру
 */
function defineEventConfig(...args: unknown[]): EventConfig<string, unknown> {
  const [eventTypeOrConfig, eventPayload] = args
  if (_isObject(eventTypeOrConfig)) {
    // @ts-expect-error игнорировать ошибку типизации:
    // ф-я получает на вход аргументы ф-ии `emit`, поэтому если значение
    // `eventTypeOrConfig` - объект, то оно соответствует типу `EventConfig`.
    return eventTypeOrConfig
  }
  if (_isString(eventTypeOrConfig)) {
    return {
      type: eventTypeOrConfig,
      eventInit: { detail: eventPayload }
    }
  }
  throw new ArgumentError({
    argument: '...args',
    functionName: 'emit'
  })
}

export default defineEventConfig
