---
title: ConversationList | Bobo-Element
description: ConversationList 对话列表
---

# ConversationList 对话列表

对话历史列表容器，支持自动滚动到底部和加载更多历史消息。

## 基础用法

<preview path="../demo/ConversationList/Basic.vue" title="基础用法" description="ConversationList 组件的基础用法"></preview>

## 加载更多

滚动到顶部时触发 `load-more` 事件。

<preview path="../demo/ConversationList/LoadMore.vue" title="加载更多" description="ConversationList 加载更多"></preview>

## React 用法

```tsx
import { ConversationList, ChatMessage } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  return (
    <ConversationList height="400px" onLoadMore={() => console.log('load more')}>
      <ChatMessage role="user" timestamp={new Date()}>Hello</ChatMessage>
      <ChatMessage role="assistant" timestamp={new Date()}>Hi!</ChatMessage>
    </ConversationList>
  )
}
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoScroll | 新消息自动滚到底部 | `boolean` | `true` |
| loadingMore | 正在加载历史消息 | `boolean` | `false` |
| height | 容器高度 | `string` | — |
| maxHeight | 容器最大高度 | `string` | `'100%'` |
| preserveScrollOnPrepend | 加载历史消息时保持当前滚动位置 | `boolean` | `true` |
| emptyText | 空状态文案 | `string` | `'暂无对话'` |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| load-more / onLoadMore | 滚动到顶部时触发 | — |
| scroll / onScroll | 滚动时触发 | `(scrollTop: number)` |

### 方法 (Exposes / Ref)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| scrollToBottom | 滚动到底部 | `() => void` |
| getElement | 获取滚动容器 DOM | `() => HTMLElement \| null` |

### 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 对话消息列表 |
