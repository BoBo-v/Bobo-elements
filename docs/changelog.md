# 更新日志

## v1.3.2

_2026-10-09_

### 性能与长列表优化

- **ChatMessage 视口外渲染优化**：引入现代浏览器原生 `content-visibility: auto` 与 `contain-intrinsic-size: auto 80px`，大幅降低长对话列表渲染压力与布局重排负担，并支持 `contentVisibility` 属性配置。
- **ConversationList 流式滚动与历史锚点补偿**：采用 `requestAnimationFrame` 合并 MutationObserver 与 ResizeObserver 滚动触发；在历史消息前插时记录旧滚动位置与内容高度差，实现平滑视口锚点补偿，消除加载更多消息时的视口跳动。

### AI 核心组件与安全增强

- **StreamingText Unicode 字素簇支持**：采用 `Intl.Segmenter`（grapheme 粒度）进行文本切分并缓存切分结果，防止复杂 Emoji（如 ZWJ、肤色修饰符）和复合字符截断乱码，并提供安全的无孤立代理项降级保证。
- **MarkdownRenderer 安全迁移至 markdown-it**：底层解析引擎从 marked 迁移至 markdown-it，补充 `@types/markdown-it` 开发依赖；支持 GFM 表格与任务列表；构建严格的安全 URL 协议白名单，禁止不受信任的协议与恶意 SVG data URL，防范 XSS 注入。
- **PromptInput 无障碍与事件契约健全**：支持独立 `id`、`aria-label` 与 `aria-labelledby` 属性；修复外部监听器调用 `e.preventDefault()` 无法拦截 Enter 提交的缺陷；完善中文/IME 拼音合成输入边界判断；将属性更正为 `stoppable`（同时向后兼容保留已废弃的旧属性 `stopable`）。

### 交互质感与视觉体系升级

- **AI 设计变量与深色模式**：扩展 `--vk-ai-*` 与 `--vk-code-*` 设计 Token，打磨聊天气泡阴影、圆角、层次与 Markdown 表格排版，全面优化深色模式（Dark Mode）视觉对比度。
- **动效打磨**：升级 ThinkingIndicator 流光呼吸渐变动画；完善 ReasoningBlock 思维链折叠过渡与耗时/Token 元数据展示；打磨流式文本光标动效细节。

### 架构清理与代码重构

- **死代码与孤立文件清理**：清理重构遗留的旧 `src/components/` 孤立类型与方法文件、旧脚手架测试代码（`VNode.tsx`、`App2.vue`）及冗余的 `src/core/styles/` 样式。
- **React 组件完善**：React `Button` 接入 `useButtonLogic` hook，补齐 `size`、`plain`、`round`、`circle` 支持；修复 React `Input` 未绑定 `handleChange` 导致 `onChange` 回调无法触发的问题。
- **规范导出与全量类型对齐**：Vue 入口补充导出所有组件的 Props、Emits 与 Instance 类型；React 入口补齐 `AlertType`、`NativeType` 等类型定义；收敛内部无用函数导出。
- **代码规范达标**：全面清理各组件未使用的 import 与变量，ESLint 达到 0 错误 0 警告纯净通过。

### 工程化与开发脚本

- 拆分 `package.json` 中的 `lint`（只读检查）与 `lint:fix`（自动修复）命令，避免 CI 检查时误改写文件。
- 完善 UMD 外部依赖打包配置，避免 JSX classic 模式潜在报错。
- 扩展测试套件至 37 个测试文件、271 项测试用例，100% 通过验证。

---

## v1.3.1

_2026-06-10_

### 发布

- 调整 npm 发布版本号，避免覆盖已发布的 `1.3.0`。
- 更新 npm 包描述、关键词和 README，补充 AI 原生组件、Vue / React 子路径导出和对话组件组合示例。

---

## v1.3.0

_2026-06-10_

### 新增

- 新增 9 个 AI 原生组件：ThinkingIndicator、StreamingText、CodeBlock、PromptInput、ReasoningBlock、ChatMessage、TokenBadge、MarkdownRenderer、ConversationList。
- 首页新增 AI 原生组件展示区，组合演示流式输出、思维链、代码块、聊天气泡和 Token 信息。
- 组件总览新增 AI 组件分组，并置顶展示 AI 组件能力。
- ConversationList 新增 `height` 属性，便于构建固定高度的对话滚动区域。
- PromptInput 新增尺寸、填充样式和清除按钮能力。
- TokenBadge 新增尺寸和 filled 样式。
- ThinkingIndicator 新增状态色支持。

### 优化

- StreamingText 支持光标样式配置，并保证同一段文本的完成事件只触发一次。
- CodeBlock 支持亮色主题、自动换行、滚动控制和高亮行。
- ChatMessage 支持复制文本内容和自定义 loading 插槽。
- ConversationList 优化自动滚动逻辑，避免新消息插入后误判是否贴底。
- MarkdownRenderer 统一 Vue 与 React API，移除不一致的 `tag` 参数。
- VitePress 示例统一切换到 `src/vue/components` 路径，适配 Vue / React 分目录后的源码结构。
- `npm run type-check` 改为检查发布源码配置 `tsconfig.build.json`。

### 修复

- 修复 React MarkdownRenderer 类型与实现不一致导致 type-check 失败的问题。
- 修复 ConversationList 文档示例中使用 `max-height` 与组件属性不一致的问题。
- 修复 ThinkingIndicator 默认 primary 颜色未生效的问题。
- 修复 PromptInput 清除按钮在表单中可能触发 submit 的问题。
- 修复部分文档 demo 中文字符串损坏导致文档构建失败的问题。

### 清理

- 移除旧的 `src/components` 组件实现、旧安装入口和旧测试文件。
- 保留 `src/components` 作为共享样式、类型和工具目录。
- 移除旧的 `src/App.vue`、`src/indexold.ts`、`src/test.plugin.ts`。
- 新增轻量本地开发入口 `src/DevApp.vue`，`src/main.ts` 改为使用该入口。

---

## v1.2.0

_2026-04-23_

### 工具链升级

- TypeScript 4.7 升级到 5.7，支持 `satisfies`、const 类型参数、装饰器等新特性。
- Vite 4.x 升级到 6.x，基于 Rollup 4 的构建引擎，提升构建速度。
- Vitest 0.29 升级到 3.x，测试框架全面升级。
- @vitejs/plugin-vue、@vitejs/plugin-vue-jsx、@vitejs/plugin-react、vite-plugin-dts、vue-tsc 等核心工具升级。

### Vue 组件补齐

- Vue 侧补齐 Input、Switch、Form、FormItem、Select、Message、Notification、Tooltip 等组件能力。
- 补齐表单校验、远程搜索、命令式消息通知、Popper 定位等基础能力。

### 修复

- 修复 Dropdown 组件引用不存在的 core 文件导致构建失败的问题。
- 修复 VitePress 文档配置中引用已移除插件的问题。

### 清理

- 移除不再需要的 unplugin-vue-macros、@vue-macros/volar、vite-plugin-eslint、@vue/tsconfig、jest-environment-jsdom。
- tsconfig 迁移到 TypeScript 5 兼容配置。

---

## v1.1.0

_2025-12-20_

### 新增

- 新增 React 组件支持，包括 Button、Collapse、Alert、Icon、Tooltip、Dropdown 等。
- 支持子路径导出：`@bobocn/element/vue` 和 `@bobocn/element/react`。
- 样式统一通过 `@bobocn/element/style.css` 引入。

### 变更

- 重构打包方案，Vue 和 React 独立打包，互不干扰。
- 框架依赖 Vue 和 React 改为可选 peerDependencies，按需安装。
- 移除全局注册方式，改为按需引入。

---

## v1.0.2

_2025-10-15_

### 新增

- Select 组件新增远程搜索能力。
- Select 组件新增自定义渲染能力。
- Input 组件新增复合型输入框插槽。

### 修复

- 修复 Message 组件 offset 计算偏移问题。
- 修复 Tooltip 在手动模式下快速切换导致的闪烁问题。
- 修复 Switch 组件自定义 value 类型时绑定值异常的问题。

### 优化

- 优化 Dropdown 组件动画过渡效果。
- 优化 Form 表单校验错误信息展示。

---

## v1.0.1

_2024-06-05_

### 新增

- 新增 Notification 通知组件。
- 新增 Alert 提示组件。
- Dropdown 组件新增手动控制模式。
- Tooltip 组件新增 click-outside 事件。

### 修复

- 修复 Collapse 手风琴模式下展开异常的问题。
- 修复 Button 组件 loading 状态下仍可点击的问题。
- 修复 Input 密码框切换时光标位置重置的问题。

### 优化

- 优化 Message 组件层级管理。
- 优化组件库整体 TypeScript 类型导出。

---

## v1.0.0

_2024-01-20_

### 新增

- 发布 Bobo-Elements 组件库首个正式版本。
- 支持 Button、Form、FormItem、Input、Select、Switch、Collapse、Tooltip、Dropdown、Message 等基础组件。
- 支持全局注册和按需引入。
- 基于 Vue 3 Composition API + TypeScript 开发。
- 提供完整类型定义文件。
