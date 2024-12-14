import type { Dictionary, PickKeys } from 'ts-essentials'
import type { Context } from './Context'
import { StartsWith } from '../../helpers/typedef'

/** Хранилище функций, вызываемых в рамках _жизненного цикла_ компонента */
export type WhenCallbacks = Readonly<_WhenCallbacks>
type _Keys = { [K in keyof Context]: StartsWith<K & string, 'when'> }
type _WhenCallbacks = Dictionary<Set<VoidFunction>, PickKeys<_Keys, true>>
