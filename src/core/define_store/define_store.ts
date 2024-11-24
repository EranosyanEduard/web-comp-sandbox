import { Ctx as Context, currentContext } from '../current_context'
import type { Accessor } from '../helpers/typedef'

function defineStore<R>(setup: Accessor<R>['get']): Accessor<R>['get'] {
  const storeContext = new Context({
    containsContext: () => {
      throw new Error('not implemented')
    }
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
