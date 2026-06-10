import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Bobo-elements",
    description: "AI 原生的 Vue3 + React 双框架组件库",
    vite: {
        plugins: [
            vueJsx(),
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

        sidebar: {
            '/components/': [
                {
                    text: 'AI 组件',
                    items: [
                        { text: 'ThinkingIndicator 思考指示器', link: '/components/thinking-indicator' },
                        { text: 'StreamingText 流式文本', link: '/components/streaming-text' },
                        { text: 'CodeBlock 代码块', link: '/components/code-block' },
                        { text: 'TokenBadge Token标签', link: '/components/token-badge' },
                        { text: 'MarkdownRenderer Markdown渲染', link: '/components/markdown-renderer' },
                        { text: 'PromptInput 提示词输入', link: '/components/prompt-input' },
                        { text: 'ReasoningBlock 思维链', link: '/components/reasoning-block' },
                        { text: 'ChatMessage 聊天气泡', link: '/components/chat-message' },
                        { text: 'ConversationList 对话列表', link: '/components/conversation-list' },
                    ]
                },
                {
                    text: '基础组件',
                    items: [
                        { text: 'Button 按钮', link: '/components/button' },
                        { text: 'Alert 提示', link: '/components/alert' },
                        { text: 'Tag 标签', link: '/components/tag' },
                    ]
                },
                {
                    text: '表单组件',
                    items: [
                        { text: 'Form 表单', link: '/components/form' },
                        { text: 'Input 输入框', link: '/components/input' },
                        { text: 'Select 选择器', link: '/components/select' },
                        { text: 'Switch 开关', link: '/components/switch' },
                        { text: 'Radio 单选框', link: '/components/radio' },
                        { text: 'Checkbox 多选框', link: '/components/checkbox' },
                    ]
                },
                {
                    text: '数据展示',
                    items: [
                        { text: 'Collapse 折叠面板', link: '/components/collapse' },
                        { text: 'Tabs 标签页', link: '/components/tabs' },
                        { text: 'Tooltip 文字提示', link: '/components/tooltip' },
                        { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
                    ]
                },
                {
                    text: '反馈组件',
                    items: [
                        { text: 'Modal 对话框', link: '/components/modal' },
                        { text: 'Message 消息', link: '/components/message' },
                        { text: 'Notification 通知', link: '/components/notification' },
                    ]
                },
            ],
            '/Shiyong': [
                {
                    text: '开发指南',
                    items: [
                        { text: '开始使用', link: '/Shiyong' },
                        { text: '更新日志', link: '/changelog' },
                    ]
                },
            ],
            '/changelog': [
                {
                    text: '开发指南',
                    items: [
                        { text: '开始使用', link: '/Shiyong' },
                        { text: '更新日志', link: '/changelog' },
                    ]
                },
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/BoBo-v/Bobo-elements.git' }
        ],

        footer: {
            message: '基于 MIT 许可发布',
            copyright: 'Copyright © 2026 Bobo-elements'
        }
    }
})
