import type { AnyFunction } from 'ts-essentials'
import { currentContext } from '../current_context'

/**
 * Определить действие при удалении компонента.
 * @param f - действие
 * @since 1.0.0
 * @version 1.0.0
 */
function onDestroyed(f: AnyFunction<[], void | Promise<void>>): void {
  currentContext.get()?.whenDestroyed(() => {
    void f()
  })
}

export default onDestroyed
