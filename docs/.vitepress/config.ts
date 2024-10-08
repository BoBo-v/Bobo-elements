import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bobo-elements",
  description: "基于vue3+Typescript,开发者的组件库",
  vite: {
    plugins: [
      VueMacros.vite({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx(),
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/Shiyong' },
      { text: '组件', link: '/components/button' },
      { text: '关于', link: '/components/about' },
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' },
      //     { text: 'Test here', link: '/api-examples' }
      //   ]
      // },
      {
        text: 'Bobo-elements 组件列表',
        items: [
          {text: 'Button 按钮', link: '/components/button' },
          {text: 'Form 表单', link: '/components/form' },
          {text: 'Message 消息', link: '/components/message' },
          {text: 'Select 选择器', link: '/components/select' },
          {text: 'Switch 开关', link: '/components/switch' },
          {text: 'Input 文字输入', link: '/components/input' },
          {text: 'Alert 提示', link: '/components/alert' },
          {text: 'Collapse 折叠面板', link: '/components/collapse' },
          {text: 'Tooltip 文字提示', link: '/components/tooltip' },
          {text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
          {text: 'Notification 提示', link: '/components/notification' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
