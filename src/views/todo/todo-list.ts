import { html } from 'lit-html'
import { defineComponent, type PropType } from '../../core'
import './todo-list.css'

/** Список задач */
export default defineComponent({
  name: 'TodoList',
  emits: ['complete', 'delete'],
  props: {
    items: {
      required: true,
      type: Array as PropType.Array<Array<{ complete: boolean; text: string }>>
    }
  },
  setup(props, { emit }) {
    const oncomplete = (index: number): void => {
      emit('complete', index)
    }
    const ondelete = (index: number): void => {
      emit('delete', index)
    }
    return () => html`
      <style></style>
      <ul>
        ${props.items.map(
          (todo, index) => html`
            <li class=${todo.complete ? 'complete' : ''}>
              ${todo.text}
              <div>
                <v-btn
                  .text=${true}
                  .disabled=${todo.complete}
                  @click=${() => {
                    oncomplete(index)
                  }}
                >
                  +
                </v-btn>
                <v-btn
                  .text=${true}
                  .disabled=${todo.complete}
                  @click=${() => {
                    ondelete(index)
                  }}
                >
                  -
                </v-btn>
              </div>
            </li>
          `
        )}
      </ul>
    `
  }
})
