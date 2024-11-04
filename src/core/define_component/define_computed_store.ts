import type { ComputedStore } from './typedef'

/** Определить хранилище вычисляемых значений */
function defineComputedStore(): ComputedStore {
  let collection: ReadonlySet<VoidFunction> | null = null
  return {
    evaluate() {
      collection?.forEach((compute) => {
        compute()
      })
    },
    subscribe(...computeValues) {
      collection = new Set(Array.from(collection ?? []).concat(computeValues))
    }
  }
}

export default defineComputedStore
