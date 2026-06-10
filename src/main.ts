import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './DevApp.vue'
import './styles/index.css'

library.add(fas)

createApp(App).mount('#app')
