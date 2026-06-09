---
title: ThinkingIndicator | Bobo-Element
description: ThinkingIndicator 思考指示器
---

# ThinkingIndicator 思考指示器

用于 AI 应用中表示模型正在思考或生成内容的加载动画。

## 基础用法

默认使用 dots 动画变体。

<preview path="../demo/ThinkingIndicator/Basic.vue" title="基础用法" description="ThinkingIndicator 组件的基础用法"></preview>

## 动画变体

提供三种动画变体：`dots`（弹跳圆点）、`pulse`（脉冲）、`wave`（波浪条）。

<preview path="../demo/ThinkingIndicator/Variants.vue" title="动画变体" description="ThinkingIndicator 三种动画变体"></preview>

## 不同尺寸

通过 `size` 属性设置不同尺寸。

<preview path="../demo/ThinkingIndicator/Sizes.vue" title="不同尺寸" description="ThinkingIndicator 不同尺寸"></preview>

## React 用法

```tsx
import { ThinkingIndicator } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  return (
    <div>
      <ThinkingIndicator />
      <ThinkingIndicator variant="pulse" text="Pulse" />
      <ThinkingIndicator variant="wave" size="large" />
    </div>
  )
}
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 动画变体 | `'dots' \| 'pulse' \| 'wave'` | `'dots'` |
| text | 提示文本 | `string` | `'正在思考...'` |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| ariaLabel | 无障碍标签 | `string` | `'AI 正在思考'` |
