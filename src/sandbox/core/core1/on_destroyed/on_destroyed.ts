import type { AnyFunction } from 'ts-essentials'
import { accessor } from '../current_instance'

/**
 * Определить действие при удалении компонента.
 * @param f - действие
 */
function onDestroyed(f: AnyFunction<[], void | Promise<void>>): void {
  accessor.get()?.whenDestroyed(() => {
    void f()
  })
}

export default onDestroyed
