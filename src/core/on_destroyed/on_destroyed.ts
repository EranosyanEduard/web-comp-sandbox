import type { AnyFunction } from 'ts-essentials'
import { currentContext } from '../current_context'

/**
 * Определить действие при удалении компонента.
 * @param f - действие
 */
function onDestroyed(f: AnyFunction<[], void | Promise<void>>): void {
  currentContext.get()?.whenDestroyed(() => {
    void f()
  })
}

export default onDestroyed
