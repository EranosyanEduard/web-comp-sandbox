/** Ошибка "Свойство объекта доступно только для чтения" */
class ReadonlyPropertyError extends Error {
  constructor(params: Readonly<{ property: string }>) {
    const { property } = params
    super(`Свойство "${property}" доступно только для чтения`)
    this.name = 'ReadonlyPropertyError'
  }
}

export default ReadonlyPropertyError
