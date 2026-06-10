---
title: ChatMessage | Bobo-Element
description: ChatMessage 聊天气泡
---

# ChatMessage 聊天气泡

AI 聊天场景的消息气泡组件，区分 user/assistant/system 角色，支持头像、时间戳、状态指示和重试。

## 基础用法

<preview path="../demo/ChatMessage/Basic.vue" title="基础用法" description="ChatMessage 组件的基础用法"></preview>

## 流式状态

设置 `status="streaming"` 显示 AI 正在生成的指示器。

<preview path="../demo/ChatMessage/Streaming.vue" title="流式状态" description="ChatMessage 流式状态"></preview>

## 错误与重试

设置 `status="error"` 显示错误信息和重试按钮。

<preview path="../demo/ChatMessage/Error.vue" title="错误重试" description="ChatMessage 错误重试"></preview>

## React 用法

```tsx
import { ChatMessage } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  return (
    <div>
      <ChatMessage role="user" timestamp={new Date()}>
        Hello!
      </ChatMessage>
      <ChatMessage role="assistant" timestamp={new Date()}>
        Hi, how can I help?
      </ChatMessage>
      <ChatMessage role="assistant" status="error" onRetry={() => console.log('retry')} />
    </div>
  )
}
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| role | 消息角色（必填） | `'user' \| 'assistant' \| 'system'` | — |
| avatar | 头像 URL | `string` | — |
| avatarSize | 头像尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| timestamp | 时间戳 | `string \| number \| Date` | — |
| status | 消息状态 | `'sending' \| 'sent' \| 'error' \| 'streaming'` | `'sent'` |
| showAvatar | 是否显示头像 | `boolean` | `true` |
| errorMessage | 错误信息 | `string` | `'发送失败'` |
| retryText | 重试按钮文案 | `string` | `'重试'` |
| copyable | 是否显示复制按钮 | `boolean` | `false` |
| content | 可复制的纯文本内容 | `string` | — |
| copyContent | 自定义复制内容，优先级高于 content | `string` | — |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| retry / onRetry | 点击重试时触发 | — |
| avatar-error / onAvatarError | 头像加载失败时触发 | `Event` |

### 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 消息内容 |
