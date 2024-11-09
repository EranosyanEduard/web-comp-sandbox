import { html } from 'lit-html'
import {
  computed,
  defineComponent,
  onDestroyed,
  onMounted,
  ref,
  watch
} from './core'

export default defineComponent({
  name: 'VCounter',
  props: {
    foo: {
      type: String,
      default: () => 'v-counter'
    }
  },
  setup(props) {
    console.log(props)

    const counter = ref(0)
    const computedCounter = computed(() => `computed: ${counter.value}`)

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
      <button @click=${() => counter.value++}>count</button>
      <span>count is ${counter.value}</span>
      <span>count is ${computedCounter.value}</span>
    `
  }
})
