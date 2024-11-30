import { html, render } from 'lit-html'
import './components'
import './views'
import './styles/index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const app = document.getElementById('app')!
render(html`<todo-view></todo-view>`, app)
