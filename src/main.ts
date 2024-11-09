import { html, render } from 'lit-html'
import './counter'

const vApp = (): ReturnType<typeof html> => {
  return html`<div id="app">App<v-counter /></div>`
}

render(vApp(), document.body)
