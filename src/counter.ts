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
  setup() {
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
      <button @click=${() => counter.value++}>count</button>
      <span>count is ${counter.value}</span>
      <span>count is ${computedCounter.value}</span>
    `
  }
})
