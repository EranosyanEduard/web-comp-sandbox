import { Ctx as Context, currentContext } from '../current_context'
import type { Accessor } from '../helpers/typedef'

/**
 * Определить хранилище данных.
 * @param setup - функция, возвращающая данные
 */
function defineStore<R>(setup: Accessor<R>['get']): Accessor<R>['get'] {
  const storeContext = new Context({
    // Запретить пользователю использовать api `provide/inject`, поскольку
    // вы всегда можете непосредственно импортировать экземпляр хранилища в
    // веб-компонент.
    containsContext: () => false
  })
  currentContext.set(storeContext)
  const api = setup()
  currentContext.set(null)
  return () => {
    const context = currentContext.get()
    context?.whenDestroyed(() => {
      storeContext.destroy()
    })
    context?.whenMounted(() => {
      storeContext.mount()
    })
    storeContext.whenRequestedRender(() => {
      context?.requestRender()
    })
    return api
  }
}

export default defineStore
