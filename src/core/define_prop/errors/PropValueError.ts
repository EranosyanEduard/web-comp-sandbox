import type { Dictionary } from 'ts-essentials'

/** Коллекция сообщений об ошибках */
const Reasons = Object.freeze({
  MISSING_DEFAULT_PROP: 'Значение props-а * по умолчанию не определено',
  MISSING_REQUIRED_PROP: 'Значение обязательного props-а * не определено'
} satisfies Dictionary<string>)

/** Ошибка "Отсутствует значение _props_-а" */
class PropValueError extends Error {
  constructor(
    params: Readonly<{
      name: string
      reason: keyof typeof Reasons
    }>
  ) {
    const { name, reason } = params
    const message = Reasons[reason].replace('*', name)
    super(message)
    this.name = 'PropValueError'
  }
}

export default PropValueError
