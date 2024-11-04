/** Наблюдатель за значением */
export type Watcher<T> = (nextValue: T, prevValue: T) => void | Promise<void>
