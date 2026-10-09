---
title: ConversationList | Bobo-Element
description: ConversationList 对话列表
---

# ConversationList 对话列表

对话历史列表容器组件，支持新消息平滑自动滚动到底部、到顶触发加载更早历史消息，以及前插历史消息时的视口位置锚定补偿。

## 基础用法

<preview path="../demo/ConversationList/Basic.vue" title="基础用法" description="ConversationList 组件的基础用法"></preview>

## 加载更多

滚动到顶部时触发 `load-more` 事件。内置 `preserveScrollOnPrepend` 机制，能在历史消息前插入列表后自动补偿滚动高度，防止页面视野突跳。

<preview path="../demo/ConversationList/LoadMore.vue" title="加载更多" description="ConversationList 加载更多"></preview>

## 双框架使用示例

::: code-group
```vue [Vue 3]
<template>
  <ConversationList
    height="480px"
    :loading-more="loading"
    loading-text="正在拉取更早的对话记录..."
    :preserve-scroll-on-prepend="true"
    @load-more="handleLoadMore"
  >
    <ChatMessage
      v-for="msg in messages"
      :key="msg.id"
      :role="msg.role"
      :timestamp="msg.timestamp"
    >
      {{ msg.content }}
    </ChatMessage>
  </ConversationList>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ConversationList, ChatMessage } from '@bobocn/element/vue'
import '@bobocn/element/style.css'

const loading = ref(false)
const messages = ref([
  { id: 1, role: 'user' as const, content: '你好，请帮我分析这份日志', timestamp: new Date() },
  { id: 2, role: 'assistant' as const, content: '请提供日志内容，我将为您分析排查。', timestamp: new Date() }
])

const handleLoadMore = () => {
  if (loading.value) return
  loading.value = true
  setTimeout(() => {
    // 模拟向前插入 2 条历史记录
    messages.value.unshift(
      { id: -2, role: 'user' as const, content: '之前的会话 1', timestamp: new Date(Date.now() - 3600000) },
      { id: -1, role: 'assistant' as const, content: '之前的回复 1', timestamp: new Date(Date.now() - 3500000) }
    )
    loading.value = false
  }, 1000)
}
</script>
```

```tsx [React]
import React, { useState } from 'react'
import { ConversationList, ChatMessage } from '@bobocn/element/react'
import '@bobocn/element/style.css'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, role: 'user' as const, content: '你好，请帮我分析这份日志', timestamp: new Date() },
    { id: 2, role: 'assistant' as const, content: '请提供日志内容，我将为您分析排查。', timestamp: new Date() }
  ])

  const handleLoadMore = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setMessages(prev => [
        { id: -2, role: 'user' as const, content: '之前的会话 1', timestamp: new Date(Date.now() - 3600000) },
        { id: -1, role: 'assistant' as const, content: '之前的回复 1', timestamp: new Date(Date.now() - 3500000) },
        ...prev
      ])
      setLoading(false)
    }, 1000)
  }

  return (
    <ConversationList
      height="480px"
      loadingMore={loading}
      loadingText="正在拉取更早的对话记录..."
      preserveScrollOnPrepend
      onLoadMore={handleLoadMore}
    >
      {messages.map(msg => (
        <ChatMessage key={msg.id} role={msg.role} timestamp={msg.timestamp}>
          {msg.content}
        </ChatMessage>
      ))}
    </ConversationList>
  )
}
```
:::

## API

### 属性 (Attributes / Props)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoScroll | 新消息追加时是否自动平滑滚到底部 | `boolean` | `true` |
| loadingMore | 是否正在向上加载历史消息 | `boolean` | `false` |
| height | 容器固定高度（支持 CSS 单位如 `'480px'` / `'60vh'`） | `string` | — |
| maxHeight | 容器最大高度 | `string` | `'100%'` |
| preserveScrollOnPrepend | 向上加载历史消息前插时保持当前视口位置（滚动补偿） | `boolean` | `true` |
| emptyText | 无消息时的空状态文案 | `string` | `'暂无对话'` |
| loadingText | 向上加载历史消息时的提示文本 | `string` | `'加载更早记录...'` |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| load-more / onLoadMore | 滚动到顶部（触发阈值）时触发加载更多 | — |
| scroll / onScroll | 列表滚动时触发 | `(scrollTop: number)` |

### 方法 (Exposes / Ref)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| scrollToBottom | 手动平滑滚动到列表最底部 | `() => void` |
| getElement | 获取滚动容器原生 DOM 节点 | `() => HTMLElement \| null` |

### 插槽 / Children

| 插槽名 | 说明 |
| --- | --- |
| default | 消息元素容器（通常为 ChatMessage 集合） |
