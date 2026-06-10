---
title: ReasoningBlock | Bobo-Element
description: ReasoningBlock 思维链展示
---

# ReasoningBlock 思维链展示

可折叠的思维链展示组件，用于显示 AI 模型的推理过程，支持耗时和 token 数元信息。

## 基础用法

<preview path="../demo/ReasoningBlock/Basic.vue" title="基础用法" description="ReasoningBlock 组件的基础用法"></preview>

## 默认展开

设置 `expanded` 属性默认展开内容。

<preview path="../demo/ReasoningBlock/Expanded.vue" title="默认展开" description="ReasoningBlock 默认展开"></preview>

## 元信息

通过 `duration` 和 `tokenCount` 显示推理耗时和 token 消耗。

<preview path="../demo/ReasoningBlock/Metadata.vue" title="元信息" description="ReasoningBlock 元信息"></preview>

## React 用法

```tsx
import { ReasoningBlock } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  return (
    <ReasoningBlock duration={2300} tokenCount={156}>
      AI 的推理过程内容...
    </ReasoningBlock>
  )
}
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | `'分析过程'` |
| expanded | 是否默认展开 | `boolean` | `false` |
| duration | 推理耗时 (ms) | `number` | — |
| tokenCount | token 消耗量 | `number` | — |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:expanded / onExpandedChange | 展开状态变化时触发 | `(expanded: boolean)` |

### 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 思维链内容 |
