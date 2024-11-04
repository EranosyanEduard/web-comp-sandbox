import { describe, expect, it, vi } from 'vitest'
import { accessor } from '../../current_instance'
import { defineInstance } from '../../helpers/test'
import { ref } from '../../ref'
import watch from '../watch'

describe('тест функции `ref`', () => {
  it('должен установить наблюдение за реактивным значением', () => {
    expect.hasAssertions()

    const comp = defineInstance()
    const user = ref('John Doe')
    const watcher = vi.fn()
    accessor.set(comp)
    watch(user, watcher)
    user.value = 'Marty McFly'
    user.value = 'John Doe'

    expect(watcher).toHaveBeenCalledTimes(2)
    expect(watcher).toHaveBeenNthCalledWith(1, 'Marty McFly', 'John Doe')
    expect(watcher).toHaveBeenNthCalledWith(2, 'John Doe', 'Marty McFly')

    accessor.set(null)
  })
})
