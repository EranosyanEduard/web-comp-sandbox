import type { AnyFunction } from 'ts-essentials'
import { accessor } from '../current_instance'

/**
 * Определить действие при создании компонента.
 * @param f - действие
 */
function onMounted(f: AnyFunction<[], void | Promise<void>>): void {
  accessor.get()?.whenMounted(() => {
    void f()
  })
}

export default onMounted
