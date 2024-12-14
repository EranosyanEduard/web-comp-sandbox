import type { Dictionary } from 'ts-essentials'
import type { RuntimeType } from '../../define_prop'

/** Обобщённая коллекция _props_-ов компонента */
export type SuperProps = Dictionary<RuntimeType, string>
