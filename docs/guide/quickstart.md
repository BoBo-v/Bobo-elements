# 快速开始

Bobo-Elements 是一套 AI 原生的 UI 组件库，同时支持 **Vue 3** 和 **React** 双框架。采用子路径独立导出（`@bobocn/element/vue` 与 `@bobocn/element/react`），两端共享底层交互状态机与设计变量，零冗余开销。

## 安装

根据你使用的包管理器进行安装：

::: code-group
```bash [npm]
npm install @bobocn/element
```

```bash [pnpm]
pnpm add @bobocn/element
```

```bash [yarn]
yarn add @bobocn/element
```
:::

## 按需引入与快速上手

Bobo-Elements 支持细粒度按需引入，引入组件后搭配样式文件即可直接运行。

### 基础示例

::: code-group
```vue [Vue 3]
<template>
  <div class="demo-box">
    <Button type="primary">提问</Button>
    <PromptInput v-model="prompt" placeholder="请输入你的问题..." @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, PromptInput } from '@bobocn/element/vue'
import '@bobocn/element/style.css'

const prompt = ref('')

const handleSubmit = (text: string) => {
  console.log('提交问题:', text)
}
</script>

<style scoped>
.demo-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

```tsx [React]
import React, { useState } from 'react'
import { Button, PromptInput } from '@bobocn/element/react'
import '@bobocn/element/style.css'

export default function App() {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (text: string) => {
    console.log('提交问题:', text)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Button type="primary">提问</Button>
      <PromptInput
        value={prompt}
        onChange={setPrompt}
        placeholder="请输入你的问题..."
        onSubmit={handleSubmit}
      />
    </div>
  )
}
```
:::

## 样式引入说明

组件库的基础样式与 AI 设计变量集中于单一 CSS 产物中，推荐在应用入口（如 `main.ts` / `index.tsx`）一次性导入：

```ts
import '@bobocn/element/style.css'
```

如果你的项目构建器未配置子路径样式映射，也可以使用相对绝对路径：

```ts
import '@bobocn/element/dist/index.css'
```

## CDN 与浏览器环境

如果你希望直接在原生 HTML 中通过 CDN 加载体验，推荐采用现代浏览器的原生 **ES Module (ESM)** 方式：

::: code-group
```html [Vue 3 ESM CDN]
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <!-- 引入 Bobo-Elements 核心样式 -->
  <link rel="stylesheet" href="https://unpkg.com/@bobocn/element/dist/index.css" />
</head>
<body>
  <div id="app">
    <b-button type="primary">{{ message }}</b-button>
  </div>

  <script type="module">
    import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    import { Button } from 'https://unpkg.com/@bobocn/element/dist/vue/index.js'

    const app = createApp({
      components: { 'b-button': Button },
      setup() {
        return { message: 'Hello Bobo-Elements!' }
      }
    })
    app.mount('#app')
  </script>
</body>
</html>
```
:::

::: tip 提示
生产级项目建议配合 Vite / Webpack / Next.js / Nuxt.js 等现代前端构建工具使用包管理器安装，以享受完整的 TypeScript 类型推导和 Tree-shaking 优化。
:::

## 浏览器兼容性

Bobo-Elements 基于现代前端生态构建，支持所有支持 ES2020+ 的主流浏览器：

| 浏览器 | 支持版本 |
| --- | --- |
| Chrome | ≥ 88 |
| Edge | ≥ 88 |
| Firefox | ≥ 78 |
| Safari | ≥ 14 |
| IE | 不支持 |

::: tip
Vue 3 与现代 AI 流式特性不再支持已淘汰的 IE 浏览器。
:::
