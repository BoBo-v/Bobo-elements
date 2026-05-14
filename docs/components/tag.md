---
title: Tag | Bobo-Element
description: Tag 标签
---

# Tag 标签
用于标记和选择。

## 基础用法
由 `type` 属性来选择 Tag 的类型。

<preview path="../demo/Tag/Basic.vue" title="基础用法" description="Tag 组件的基础用法"></preview>

## 可关闭标签
设置 `closable` 属性可以定义一个标签是否可移除。

<preview path="../demo/Tag/Closable.vue" title="可关闭标签" description="Tag 可关闭标签"></preview>

## 不同尺寸
Tag 组件提供三种尺寸，通过 `size` 属性来配置。

<preview path="../demo/Tag/Size.vue" title="不同尺寸" description="Tag 不同尺寸"></preview>

## 主题
Tag 组件提供了三种主题：`dark`、`light`（默认）和 `plain`。

<preview path="../demo/Tag/Effect.vue" title="主题" description="Tag 不同主题"></preview>

## 圆形标签
设置 `round` 属性可以使 Tag 变为圆形。

<preview path="../demo/Tag/Round.vue" title="圆形标签" description="Tag 圆形标签"></preview>

## React 用法

```tsx
import { Tag } from '@bobocn/element/react'
import '@bobocn/element/style.css'

// 基础用法
function App() {
  return (
    <div>
      <Tag type="primary">标签一</Tag>
      <Tag type="success">标签二</Tag>
      <Tag type="warning">标签三</Tag>
      <Tag type="danger">标签四</Tag>
      <Tag type="info">标签五</Tag>
    </div>
  )
}

// 可关闭
<Tag type="primary" closable onClose={() => console.log('closed')}>
  可关闭标签
</Tag>

// 圆形 + Dark 主题
<Tag type="success" round effect="dark">圆形标签</Tag>
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| size | 标签尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| effect | 主题 | `'dark' \| 'light' \| 'plain'` | `'light'` |
| closable | 是否可关闭 | `boolean` | `false` |
| round | 是否圆形 | `boolean` | `false` |
| color | 自定义背景色 | `string` | — |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭时触发 | — |
| click | 点击时触发 | — |

### 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 标签内容 |
