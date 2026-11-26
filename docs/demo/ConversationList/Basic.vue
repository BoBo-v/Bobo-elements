<script setup lang="ts">
import { ref } from 'vue'
import { ConversationList, ChatMessage } from '@bobocn/element/vue'

const messages = ref([
  { id: 1, role: 'user' as const, content: '你好，我想学习 Vue 3', timestamp: new Date(Date.now() - 120000) },
  {
    id: 2,
    role: 'assistant' as const,
    content: '你好！很高兴你想学习 Vue 3。它的核心特性包括组合式 API、更好的 TypeScript 支持以及细粒度响应式性能提升。',
    timestamp: new Date(Date.now() - 60000)
  },
  { id: 3, role: 'user' as const, content: '能给我一个对话列表的示例吗？', timestamp: new Date() },
  {
    id: 4,
    role: 'assistant' as const,
    content: '当然可以！ConversationList 会自动配合 ChatMessage 处理流式滚动和历史加载锚点补偿。',
    timestamp: new Date()
  }
])

function appendReply() {
  const nextId = messages.value.length + 1
  messages.value.push({
    id: nextId,
    role: nextId % 2 === 1 ? 'user' : 'assistant',
    content: nextId % 2 === 1 ? '继续补充一个问题' : '这是新追加的回复，列表会自动平滑滚到底部。',
    timestamp: new Date()
  })
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <div style="border: 1px solid var(--vk-border-color-light); border-radius: 12px; overflow: hidden;">
      <ConversationList height="320px">
        <ChatMessage
          v-for="msg in messages"
          :key="msg.id"
          :role="msg.role"
          :timestamp="msg.timestamp"
        >
          {{ msg.content }}
        </ChatMessage>
      </ConversationList>
    </div>
    <div style="display: flex; justify-content: flex-end;">
      <button
        type="button"
        style="padding: 5px 12px; font-size: 12.5px; border-radius: 6px; border: 1px solid var(--vk-border-color); background: var(--vk-fill-color-blank); cursor: pointer;"
        @click="appendReply"
      >
        追加一条消息
      </button>
    </div>
  </div>
</template>
