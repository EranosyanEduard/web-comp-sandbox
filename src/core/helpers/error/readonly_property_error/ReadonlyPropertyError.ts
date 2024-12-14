/**
 * Ошибка "Свойство объекта доступно только для чтения".
 * @since 1.0.0
 * @version 1.0.0
 */
class ReadonlyPropertyError extends Error {
  constructor(params: Readonly<{ property: string }>) {
    const { property } = params
    super(`Свойство "${property}" доступно только для чтения`)
    this.name = 'ReadonlyPropertyError'
  }
}

export default ReadonlyPropertyError
