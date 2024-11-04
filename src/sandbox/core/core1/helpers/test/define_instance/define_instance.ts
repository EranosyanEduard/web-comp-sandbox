import { vi } from 'vitest'
import type { Instance } from '../../../current_instance'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = {
  containsInstance: vi.fn(),
  requestRender: vi.fn(),
  whenDestroyed: vi.fn(),
  whenMounted: vi.fn(),
  whenRequestedRender: vi.fn()
} satisfies Instance

/** Определить текущий контекст */
function defineInstance(): typeof _ {
  return {
    containsInstance: vi.fn(),
    requestRender: vi.fn(),
    whenDestroyed: vi.fn(),
    whenMounted: vi.fn(),
    whenRequestedRender: vi.fn()
  } satisfies Instance
}

export default defineInstance
