---
title: CodeBlock | Bobo-Element
description: CodeBlock 代码块
---

# CodeBlock 代码块

用于展示代码的现代化代码块组件，支持深浅主题、语言标签、行号、一键复制、行高亮和基础语法着色。

## 基础用法

<preview path="../demo/CodeBlock/Basic.vue" title="基础用法" description="CodeBlock 组件的基础用法"></preview>

## 显示行号

设置 `showLineNumbers` 属性显示行号，`title` 可显示文件名。

<preview path="../demo/CodeBlock/LineNumbers.vue" title="显示行号" description="CodeBlock 显示行号"></preview>

## 多语言

支持 JavaScript/TypeScript、Python、CSS、Bash 的基础语法高亮。

<preview path="../demo/CodeBlock/Languages.vue" title="多语言" description="CodeBlock 多语言支持"></preview>

## 双框架使用示例

::: code-group
```vue [Vue 3]
<template>
  <CodeBlock
    :code="codeSnippet"
    language="typescript"
    title="demo.ts"
    :show-line-numbers="true"
    :highlight-lines="[2]"
    theme="dark"
  />
</template>

<script setup lang="ts">
import { CodeBlock } from '@bobocn/element/vue'
import '@bobocn/element/style.css'

const codeSnippet = `function greet(name: string): string {
  // 高亮该核心逻辑行
  return \`Hello, \${name}!\`;
}`
</script>
```

```tsx [React]
import React from 'react'
import { CodeBlock } from '@bobocn/element/react'
import '@bobocn/element/style.css'

const codeSnippet = `function greet(name: string): string {
  // 高亮该核心逻辑行
  return \`Hello, \${name}!\`;
}`

export default function App() {
  return (
    <CodeBlock
      code={codeSnippet}
      language="typescript"
      title="demo.ts"
      showLineNumbers
      highlightLines={[2]}
      theme="dark"
    />
  )
}
```
:::

## API

### 属性 (Attributes / Props)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| code | 代码内容字符串 | `string` | `''` |
| language | 编程语言类型（如 `javascript`、`typescript`、`python`、`css`、`bash`） | `string` | `''` |
| title | 代码块头部标题或文件名 | `string` | — |
| showLineNumbers | 是否显示左侧行号 | `boolean` | `false` |
| copyable | 是否显示右上角一键复制按钮 | `boolean` | `true` |
| maxHeight | 代码区域最大高度 | `string` | `'400px'` |
| scrollable | 超出高度时是否允许滚动 | `boolean` | `true` |
| wrap | 代码过长时是否允许自动换行 | `boolean` | `false` |
| theme | 代码块主题配色 | `'dark' \| 'light'` | `'dark'` |
| highlightLines | 需要高亮标记的行号数组（从 1 开始） | `number[]` | `[]` |
| copyText | 复制按钮悬浮文案 | `string` | `'复制'` |
| copiedText | 复制成功时的反馈文案 | `string` | `'已复制'` |
