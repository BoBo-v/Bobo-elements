---
title: ChatMessage | Bobo-Element
description: ChatMessage 聊天气泡
---

# ChatMessage 聊天气泡

AI 聊天场景的消息气泡组件，区分 user / assistant / system 角色，支持头像、时间戳、状态指示、一键复制、视口外性能优化及错误重试。

## 基础用法

<preview path="../demo/ChatMessage/Basic.vue" title="基础用法" description="ChatMessage 组件的基础用法"></preview>

## 流式状态

设置 `status="streaming"` 显示 AI 正在生成的指示器。

<preview path="../demo/ChatMessage/Streaming.vue" title="流式状态" description="ChatMessage 流式状态"></preview>

## 错误与重试

设置 `status="error"` 显示错误信息和重试按钮。

<preview path="../demo/ChatMessage/Error.vue" title="错误重试" description="ChatMessage 错误重试"></preview>

## 双框架使用示例

::: code-group
```vue [Vue 3]
<template>
  <div class="chat-container">
    <ChatMessage role="user" :timestamp="new Date()">
      请帮我写一个 TypeScript 工具函数。
    </ChatMessage>

    <ChatMessage
      role="assistant"
      :timestamp="new Date()"
      status="sent"
      copyable
      content="export function clamp(val: number, min: number, max: number) { return Math.min(Math.max(val, min), max); }"
    >
      没问题，这是为您实现的 clamp 函数：
    </ChatMessage>

    <ChatMessage
      role="assistant"
      status="error"
      error-message="网络连接超时"
      retry-text="重新生成"
      @retry="handleRetry"
    />
  </div>
</template>

<script setup lang="ts">
import { ChatMessage } from '@bobocn/element/vue'
import '@bobocn/element/style.css'

const handleRetry = () => {
  console.log('触发重试')
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

```tsx [React]
import React from 'react'
import { ChatMessage } from '@bobocn/element/react'
import '@bobocn/element/style.css'

export default function App() {
  const handleRetry = () => {
    console.log('触发重试')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ChatMessage role="user" timestamp={new Date()}>
        请帮我写一个 TypeScript 工具函数。
      </ChatMessage>

      <ChatMessage
        role="assistant"
        timestamp={new Date()}
        status="sent"
        copyable
        content="export function clamp(val: number, min: number, max: number) { return Math.min(Math.max(val, min), max); }"
      >
        没问题，这是为您实现的 clamp 函数：
      </ChatMessage>

      <ChatMessage
        role="assistant"
        status="error"
        errorMessage="网络连接超时"
        retryText="重新生成"
        onRetry={handleRetry}
      />
    </div>
  )
}
```
:::

## API

### 属性 (Attributes / Props)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| role | 消息角色（必填） | `'user' \| 'assistant' \| 'system'` | — |
| avatar | 头像图片 URL | `string` | — |
| avatarSize | 头像尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| timestamp | 时间戳 | `string \| number \| Date` | — |
| status | 消息状态 | `'sending' \| 'sent' \| 'error' \| 'streaming'` | `'sent'` |
| showAvatar | 是否显示头像 | `boolean` | `true` |
| errorMessage | 发送失败时的错误提示信息 | `string` | `'发送失败'` |
| retryText | 重试按钮自定义文案 | `string` | `'重试'` |
| copyable | 是否显示内容复制按钮 | `boolean` | `false` |
| content | 默认复制的纯文本内容 | `string` | — |
| copyContent | 自定义复制内容（优先级高于 content） | `string` | — |
| copyText | 复制按钮悬浮/按钮文案 | `string` | `'复制'` |
| copiedText | 复制成功时的反馈文案 | `string` | `'已复制'` |
| contentVisibility | 视口外渲染优化策略（利用浏览器原生 `content-visibility` 降低长列表重绘开销） | `'auto' \| 'visible'` | `'auto'` |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| retry / onRetry | 点击重试按钮时触发 | — |
| avatar-error / onAvatarError | 头像加载失败时触发 | `Event` |

### 插槽 / Children

| 插槽名 | 说明 |
| --- | --- |
| default | 消息气泡主体内容 |
