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
  emits: ['foo', 'bar', 'baz'],
  props: {
    foo: {
      type: String,
      default: () => 'v-counter'
    },
    bar: {
      type: [String, Number]
    }
  },
  shadowRootConfig: { mode: 'closed' },
  setup(props, { element, emit }) {
    const counter = ref(0)
    const computedCounter = computed(() => `computed: ${counter.value}`)
    const store_ = storeB()
    const _ = props.bar

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
          emit('foo')
          emit('bar', 'yes')
          emit({ type: 'baz', eventInit: { detail: counter } })
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
