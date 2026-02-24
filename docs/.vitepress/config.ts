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
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    markdown: {
        config(md) {
            md.use(containerPreview)
            md.use(componentPreview)
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.png',
        nav: [
            { text: '开始使用', link: '/Shiyong' },
            { text: '组件', link: '/components/button' },
            { text: '更新日志', link: '/changelog' },
            { text: 'Playground', link: '/playground' },
            { text: '关于', link: '/components/about' },
        ],

        sidebar: [
            {
                text: '开发指南',
                items: [
                    { text: '开始使用', link: '/Shiyong' },
                    { text: '更新日志', link: '/changelog' },
                ]
            },
            {
                text: '基础组件',
                items: [
                    { text: 'Button 按钮', link: '/components/button' },
                    { text: 'Alert 提示', link: '/components/alert' },
                ]
            },
            {
                text: '表单组件',
                items: [
                    { text: 'Form 表单', link: '/components/form' },
                    { text: 'Input 输入框', link: '/components/input' },
                    { text: 'Select 选择器', link: '/components/select' },
                    { text: 'Switch 开关', link: '/components/switch' },
                ]
            },
            {
                text: '数据展示',
                items: [
                    { text: 'Collapse 折叠面板', link: '/components/collapse' },
                    { text: 'Tooltip 文字提示', link: '/components/tooltip' },
                    { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
                ]
            },
            {
                text: '反馈组件',
                items: [
                    { text: 'Message 消息', link: '/components/message' },
                    { text: 'Notification 通知', link: '/components/notification' },
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/BoBo-v/Bobo-elements.git' }
        ],

        footer: {
            message: '基于 MIT 许可发布',
            copyright: 'Copyright © 2024 Bobo-elements'
        }
    }
})