import type { Dictionary } from 'ts-essentials'
import type { DefinePropTypedef } from '../../define_prop'

/** Обобщённая коллекция _props_-ов компонента */
export type SuperProps = Dictionary<DefinePropTypedef.RuntimeType, string>
