import type { Dictionary, StrictExtract } from 'ts-essentials'
import type { Context } from '../../current_context'

/** Хранилище функций, вызываемых в рамках _жизненного цикла_ компонента */
export type WhenCallbacks = Readonly<_WhenCallbacks>

type _WhenCallbacks = Dictionary<
  Set<VoidFunction>,
  StrictExtract<
    keyof Context,
    'whenDestroyed' | 'whenMounted' | 'whenRequestedRender'
  >
>
