import type { App } from 'vue'
import Button from './components/Button/Button.vue'
const plugins = {
  install: (app: App) => {
    app.config.globalProperties.$echo = (name: string) => {
      return `hello ${name}`
    }
    app.component('v-button', Button)
    app.provide('test', { message: 'from plugin' })
  }
}
export default plugins