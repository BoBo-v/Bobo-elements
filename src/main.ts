import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import testPlugin from './test.plugin'

library.add(fas)
import './styles/index.css'
console.log(App.render?.toString())
const app = createApp(App)
app.use(testPlugin)
app
.mount('#app')
