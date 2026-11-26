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
                '@bobocn/element/vue': fileURLToPath(new URL('../../src/vue/index.ts', import.meta.url)),
                '@bobocn/element/style.css': fileURLToPath(new URL('../../src/styles/index.css', import.meta.url)),
                '@': fileURLToPath(new URL('../../src', import.meta.url))
            }
        }
    },
    head: [
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/bobo-favicon.png' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/bobo-docs-logo.png' }],
        ['meta', { property: 'og:image', content: '/bobo-logo-preview.png' }],
        ['meta', { name: 'twitter:image', content: '/bobo-logo-preview.png' }],
    ],
    markdown: {
        config(md) {
            md.use(containerPreview)
            md.use(componentPreview)
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/bobo-docs-logo.png',
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                    closeText: '关闭'
                                }
                            }
                        }
                    }
                }
            }
        },
        nav: [
            { text: '快速开始', link: '/guide/quickstart' },
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
                        { text: 'Welcome 欢迎页', link: '/components/welcome' },
                        { text: 'Prompts 推荐提示词', link: '/components/prompts' },
                        { text: 'Attachment 附件卡片', link: '/components/attachment' },
                        { text: 'ToolCall 工具调用', link: '/components/tool-call' },
                        { text: 'Sources 参考来源', link: '/components/sources' },
                        { text: 'SessionList 会话历史', link: '/components/session-list' },
                        { text: 'MessageActions 消息操作栏', link: '/components/message-actions' },
                        { text: 'DiffCodeBlock 代码对比', link: '/components/diff-code-block' },
                        { text: 'ModelSelector 模型选择器', link: '/components/model-selector' },
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
            '/guide/': [
                {
                    text: '开发指南',
                    items: [
                        { text: '快速开始', link: '/guide/quickstart' },
                        { text: '更新日志', link: '/changelog' },
                    ]
                },
            ],
            '/changelog': [
                {
                    text: '开发指南',
                    items: [
                        { text: '快速开始', link: '/guide/quickstart' },
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
