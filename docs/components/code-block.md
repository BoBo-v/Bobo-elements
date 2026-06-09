---
title: CodeBlock | Bobo-Element
description: CodeBlock 代码块
---

# CodeBlock 代码块

用于展示代码的暗色主题组件，支持语言标签、行号、一键复制和基础语法高亮。

## 基础用法

<preview path="../demo/CodeBlock/Basic.vue" title="基础用法" description="CodeBlock 组件的基础用法"></preview>

## 显示行号

设置 `showLineNumbers` 属性显示行号，`title` 可显示文件名。

<preview path="../demo/CodeBlock/LineNumbers.vue" title="显示行号" description="CodeBlock 显示行号"></preview>

## 多语言

支持 JavaScript/TypeScript、Python、CSS、Bash 的基础语法高亮。

<preview path="../demo/CodeBlock/Languages.vue" title="多语言" description="CodeBlock 多语言支持"></preview>

## React 用法

```tsx
import { CodeBlock } from '@bobocn/element/react'
import '@bobocn/element/style.css'

const code = `const x = 42
console.log(x)`

function App() {
  return (
    <CodeBlock
      code={code}
      language="javascript"
      title="example.js"
      showLineNumbers
    />
  )
}
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| code | 代码内容 | `string` | `''` |
| language | 编程语言 | `string` | `''` |
| title | 文件名/标签 | `string` | — |
| showLineNumbers | 是否显示行号 | `boolean` | `false` |
| copyable | 是否显示复制按钮 | `boolean` | `true` |
| maxHeight | 代码区最大高度 | `string` | `'400px'` |
| copyText | 复制按钮文案 | `string` | `'复制'` |
| copiedText | 已复制按钮文案 | `string` | `'已复制'` |
