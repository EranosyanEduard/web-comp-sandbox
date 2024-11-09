import { html, render } from 'lit-html'
import './counter'

const vApp = (title?: string): ReturnType<typeof html> => {
  return html` <div id="app">
    App
    <v-counter
      .foo=${title}
      @foo=${console.log.bind(console)}
    />
  </div>`
}

render(vApp(), document.body)
