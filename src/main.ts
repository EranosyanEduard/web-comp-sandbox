import { html, render } from 'lit-html'
import './counter'

const vApp = (title?: string): ReturnType<typeof html> => {
  console.log('title', title)

  return html`<div id="app">App<v-counter .foo=${title} /></div>`
}

render(vApp(), document.body)

let title: string | undefined
setInterval(() => {
  console.log('tick')

  title ??= 'loading'
  title += '...'
  render(vApp(title), document.body)
}, 5_000)
