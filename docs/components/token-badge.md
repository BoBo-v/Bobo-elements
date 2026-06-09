---
title: TokenBadge | Bobo-Element
description: TokenBadge Token 标签
---

# TokenBadge Token 标签

用于显示 AI 模型 token 消耗量的小型标签组件。

## 基础用法

通过 `used` 和 `total` 显示 token 使用量，`status` 控制颜色状态。

<preview path="../demo/TokenBadge/Basic.vue" title="基础用法" description="TokenBadge 组件的基础用法"></preview>

## 大数字格式化

自动格式化大数字（K/M），可自定义前缀。

<preview path="../demo/TokenBadge/Limits.vue" title="大数字" description="TokenBadge 大数字格式化"></preview>

## React 用法

```tsx
import { TokenBadge } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  return (
    <div>
      <TokenBadge used={1200} total={4000} />
      <TokenBadge used={3500} total={4000} status="warning" />
      <TokenBadge used={4200} total={4000} status="danger" />
    </div>
  )
}
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| used | 已用 token 数 | `number` | `0` |
| total | 总限额 | `number` | — |
| status | 状态颜色 | `'normal' \| 'warning' \| 'danger'` | `'normal'` |
| prefix | 前缀文案 | `string` | `'Tokens'` |
