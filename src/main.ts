import { html, render } from 'lit-html'
import './counter'

const vApp = (title?: string): ReturnType<typeof html> => {
  return html` <div id="app">
    App
    <v-counter
      .foo=${title}
      @foo=${console.log.bind(console)}
    >
      <span slot="foo">abcde</span>
    </v-counter>
    <v-counter
      .foo=${title}
      @foo=${console.log.bind(console)}
    >
      <span slot="foo">abcde</span>
    </v-counter>
  </div>`
}

render(vApp(), document.body)
