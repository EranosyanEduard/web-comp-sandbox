import { type MockedObject, vi } from 'vitest'
import type { Context } from '../../../current_context'

/** Определить текущий контекст выполнения */
function defineContext(): MockedObject<Context> {
  return {
    containsContext: vi.fn(),
    requestRender: vi.fn(),
    whenDestroyed: vi.fn(),
    whenMounted: vi.fn(),
    whenRequestedRender: vi.fn()
  }
}

export default defineContext
