---
title: MarkdownRenderer | Bobo-Element
description: MarkdownRenderer Markdown 渲染器
---

# MarkdownRenderer Markdown 渲染器

将 Markdown 文本渲染为 HTML，适用于 AI 输出内容的展示。

## 基础用法

支持标题、粗体、斜体、链接、列表、行内代码、代码块、引用等。

<preview path="../demo/MarkdownRenderer/Basic.vue" title="基础用法" description="MarkdownRenderer 组件的基础用法"></preview>

## React 用法

```tsx
import { MarkdownRenderer } from '@bobocn/element/react'
import '@bobocn/element/style.css'

const content = `# Hello

This is **bold** and *italic*.

\`\`\`javascript
console.log('hi')
\`\`\`
`

function App() {
  return <MarkdownRenderer content={content} />
}
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | Markdown 源文本 | `string` | `''` |
| tag | 根元素 HTML 标签 | `string` | `'div'` |
| breaks | 换行转 `<br>` | `boolean` | `true` |
