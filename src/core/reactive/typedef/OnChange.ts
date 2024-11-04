import type { OnChangeParams } from './OnChangeParams'

/** Наблюдатель за значением */
export type OnChange<T> = (params: OnChangeParams<T>) => void
