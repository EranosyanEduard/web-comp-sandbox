import { vi } from 'vitest'
import type { Context } from '../../../current_context'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = {
  containsContext: vi.fn(),
  requestRender: vi.fn(),
  whenDestroyed: vi.fn(),
  whenMounted: vi.fn(),
  whenRequestedRender: vi.fn()
} satisfies Context

/** Определить текущий контекст выполнения */
function defineContext(): typeof _ {
  return {
    containsContext: vi.fn(),
    requestRender: vi.fn(),
    whenDestroyed: vi.fn(),
    whenMounted: vi.fn(),
    whenRequestedRender: vi.fn()
  }
}

export default defineContext
