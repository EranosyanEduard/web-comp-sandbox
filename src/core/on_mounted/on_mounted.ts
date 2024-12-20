import type { AnyFunction } from 'ts-essentials'
import { currentContext } from '../current_context'

/**
 * Определить действие при создании компонента.
 * @param f - действие
 * @since 1.0.0
 * @version 1.0.0
 */
function onMounted(f: AnyFunction<[], void | Promise<void>>): void {
  currentContext.get()?.whenMounted(() => {
    void f()
  })
}

export default onMounted
