import { html } from 'lit-html'
import _isEmpty from 'lodash-es/isEmpty'
import { computed, defineComponent, ref } from '../../core'
import './todo-list'
import { sleep } from './utils'
import './todo.css'

/** Представление "Список задач" */
export default defineComponent({
  name: 'TodoView',
  setup() {
    const loading = ref(false)
    const todoInput = ref('')
    const todoList = ref<Array<{ complete: boolean; text: string }>>([
      { complete: false, text: 'foo' },
      { complete: false, text: 'bar' },
      { complete: false, text: 'baz' }
    ])
    const disabledTodoBtn = computed<boolean>(() => _isEmpty(todoInput.value))
    const oninputTodo = (event: CustomEvent<string>): void => {
      todoInput.value = event.detail
    }
    const todoApi = {
      _fetch: async (cb: VoidFunction): Promise<void> => {
        loading.value = true
        await sleep(cb)
        loading.value = false
      },
      create: async (): Promise<void> => {
        await todoApi._fetch(() => {
          todoList.value = todoList.value.concat({
            complete: false,
            text: todoInput.value
          })
          todoInput.value = ''
        })
      },
      delete: async (event: CustomEvent<number>): Promise<void> => {
        await todoApi._fetch(() => {
          todoList.value = todoList.value.toSpliced(event.detail, 1)
        })
      },
      update: async (event: CustomEvent<number>): Promise<void> => {
        await todoApi._fetch(() => {
          const todo = todoList.value.at(event.detail)!
          todoList.value = todoList.value.toSpliced(event.detail, 1, {
            ...todo,
            complete: true
          })
        })
      }
    } as const
    return () => html`
      <div style="display: flex; gap: 16px">
        <v-input
          .value=${todoInput.value}
          @input=${oninputTodo}
        ></v-input>
        <v-btn
          .disabled=${disabledTodoBtn.value}
          .loading=${loading.value}
          @click=${todoApi.create}
        >
          Добавить
        </v-btn>
      </div>
      <todo-list
        .items=${todoList.value}
        style="width: 50vw"
        @delete=${todoApi.delete}
        @complete=${todoApi.update}
      ></todo-list>
    `
  }
})
