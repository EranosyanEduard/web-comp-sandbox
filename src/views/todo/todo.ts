import { html } from 'lit-html'
import { defineComponent, ref } from '../../core'
import './todo-list'
import './todo.css'

/** Представление "Список задач" */
export default defineComponent({
  name: 'TodoView',
  setup() {
    const todoInput = ref('foo')
    const oninputTodo = (event: CustomEvent<string>): void => {
      todoInput.value = event.detail
    }
    return () => html`
      <div style="display: flex; gap: 16px">
        <v-input
          .value=${todoInput.value}
          @input=${oninputTodo}
        ></v-input>
      </div>
    `
  }
})
