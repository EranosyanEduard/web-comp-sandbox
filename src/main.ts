import { html, render } from 'lit-html'

const vApp = (): ReturnType<typeof html> => {
  return html`<div id="app">App</div>`
}

render(vApp(), document.body)
