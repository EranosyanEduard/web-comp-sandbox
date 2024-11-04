/** Ошибка "Недопустимый аргумент функции" */
class ArgumentError extends Error {
  constructor(params: Readonly<{ argument: string; functionName: string }>) {
    const { argument, functionName } = params
    super(`Недопустимый аргумент "${argument}" функции "${functionName}"`)
    this.name = 'ArgumentError'
  }
}

export default ArgumentError
