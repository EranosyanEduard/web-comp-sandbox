import { html } from 'lit-html'
import {
  computed,
  defineComponent,
  defineStore,
  onDestroyed,
  onMounted,
  ref,
  watch
} from './core'

const storeA = defineStore(() => {
  const counter = ref(0)
  return { counter }
})
const storeB = defineStore(() => {
  return storeA()
})

export default defineComponent({
  name: 'VCounter',
  emits: ['foo'],
  props: {
    foo: {
      type: String,
      default: () => 'v-counter'
    }
  },
  shadowRootConfig: { mode: 'closed' },
  setup(props, { element, emit }) {
    const counter = ref(0)
    const computedCounter = computed(() => `computed: ${counter.value}`)
    const store_ = storeB()

    onMounted(() => {
      console.log('mounted')
    })
    onDestroyed(() => {
      console.log('destroyed')
    })
    watch(counter, (next, prev) => {
      console.log('counter next/prev', next, prev)
    })

    return () => html`
      <h1>title: ${props.foo}</h1>
      <button
        @click=${(evt) => {
          counter.value++
          store_.counter.value++
          emit({ type: 'foo', payload: counter.value })
        }}
      >
        count
        <slot name="foo"></slot>
      </button>
      <span>counter: ${counter.value}</span>
      <span>computedCounter: ${computedCounter.value}</span>
      <span>counter: ${store_.counter.value}</span>
    `
  }
})
