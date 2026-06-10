# Bobo-element

AI 原生的 Vue3 + React 双框架组件库。内置基础 UI 组件和 AI 应用高频组件，提供统一样式、完整 TypeScript 类型和独立 Vue / React 子路径导出。

## 特性

- Vue3 与 React 双框架支持，按需从 `@bobocn/element/vue` 或 `@bobocn/element/react` 引入。
- 9 个 AI 原生组件：ThinkingIndicator、StreamingText、CodeBlock、PromptInput、ReasoningBlock、ChatMessage、TokenBadge、MarkdownRenderer、ConversationList。
- 17 个基础组件，覆盖按钮、表单、弹窗、消息、通知、标签、折叠面板等常用场景。
- 统一 CSS 入口，Vue 与 React 项目保持一致视觉体验。
- TypeScript 编写，发布包包含类型定义。

## 安装

```bash
npm i @bobocn/element
```

```bash
pnpm add @bobocn/element
```

```bash
yarn add @bobocn/element
```

## 样式

在应用入口引入样式：

```ts
import '@bobocn/element/style.css'
```

## Vue 使用

```vue
<template>
  <Button type="primary">按钮</Button>
</template>

<script setup lang="ts">
import { Button } from '@bobocn/element/vue'
import '@bobocn/element/style.css'
</script>
```

## React 使用

```tsx
import { Button } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  return <Button type="primary">按钮</Button>
}
```

## AI 对话示例

### Vue

```vue
<template>
  <ConversationList height="360px" @load-more="loadMore">
    <ChatMessage role="user" :timestamp="new Date()">
      帮我写一个防抖函数
    </ChatMessage>

    <ChatMessage role="assistant" status="streaming" copyable :copy-content="answer">
      <StreamingText :text="answer" :speed="2" />
      <ReasoningBlock title="分析过程" :duration="860" :token-count="320">
        先确认函数签名，再处理 timer、cancel 和 flush。
      </ReasoningBlock>
      <TokenBadge :used="1200" :total="4096" auto-status />
    </ChatMessage>
  </ConversationList>

  <PromptInput
    v-model="prompt"
    clearable
    stopable
    :streaming="streaming"
    @submit="send"
    @stop="stop"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ChatMessage,
  ConversationList,
  PromptInput,
  ReasoningBlock,
  StreamingText,
  TokenBadge,
} from '@bobocn/element/vue'
import '@bobocn/element/style.css'

const prompt = ref('')
const streaming = ref(false)
const answer = ref('可以，下面是一个支持 cancel 和 flush 的 TypeScript 防抖函数。')

function send(value: string) {
  prompt.value = value
  streaming.value = true
}

function stop() {
  streaming.value = false
}

function loadMore() {
  console.log('load more history')
}
</script>
```

### React

```tsx
import { useState } from 'react'
import {
  ChatMessage,
  ConversationList,
  PromptInput,
  ReasoningBlock,
  StreamingText,
  TokenBadge,
} from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [streaming, setStreaming] = useState(false)
  const answer = '可以，下面是一个支持 cancel 和 flush 的 TypeScript 防抖函数。'

  return (
    <>
      <ConversationList height="360px" onLoadMore={() => console.log('load more history')}>
        <ChatMessage role="user" timestamp={new Date()}>
          帮我写一个防抖函数
        </ChatMessage>

        <ChatMessage role="assistant" status="streaming" copyable copyContent={answer}>
          <StreamingText text={answer} speed={2} />
          <ReasoningBlock title="分析过程" duration={860} tokenCount={320}>
            先确认函数签名，再处理 timer、cancel 和 flush。
          </ReasoningBlock>
          <TokenBadge used={1200} total={4096} autoStatus />
        </ChatMessage>
      </ConversationList>

      <PromptInput
        value={prompt}
        clearable
        stopable
        streaming={streaming}
        onChange={setPrompt}
        onSubmit={(value) => {
          setPrompt(value)
          setStreaming(true)
        }}
        onStop={() => setStreaming(false)}
      />
    </>
  )
}
```

## 子路径导出

```ts
import { Button, PromptInput } from '@bobocn/element/vue'
import { Button, PromptInput } from '@bobocn/element/react'
import '@bobocn/element/style.css'
```

## 文档

演示网站：https://www.bobocn.bond/

## License

MIT
