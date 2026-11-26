<script setup lang="ts">
import { ref } from 'vue'
import { ConversationList, ChatMessage } from '@bobocn/element/vue'

let nextId = 1
const loading = ref(false)
const messages = ref([
  { id: nextId++, role: 'user' as const, content: '历史消息 1：如何排查接口超时问题？', timestamp: new Date(Date.now() - 360000) },
  { id: nextId++, role: 'assistant' as const, content: '历史消息 2：建议先核对网关超时配置与慢查询日志。', timestamp: new Date(Date.now() - 300000) },
  { id: nextId++, role: 'user' as const, content: '历史消息 3：已经定位到是缓存穿透引起的。', timestamp: new Date(Date.now() - 240000) },
  { id: nextId++, role: 'assistant' as const, content: '历史消息 4：可以补充布隆过滤器或空值短缓存。', timestamp: new Date(Date.now() - 180000) },
  { id: nextId++, role: 'user' as const, content: '向上滚动到顶部即可触发加载更多历史记录。', timestamp: new Date(Date.now() - 120000) },
  { id: nextId++, role: 'assistant' as const, content: '前插历史消息时会自动保持当前阅读视口位置不跳动。', timestamp: new Date(Date.now() - 60000) }
])

function handleLoadMore() {
  if (loading.value) return
  loading.value = true
  setTimeout(() => {
    const older = [
      { id: nextId++, role: 'user' as const, content: '更早的用户提问：系统架构演进背景。', timestamp: new Date(Date.now() - 480000) },
      { id: nextId++, role: 'assistant' as const, content: '更早的助手回复：历史记录已平滑插入顶部。', timestamp: new Date(Date.now() - 420000) }
    ]
    messages.value = [...older, ...messages.value]
    loading.value = false
  }, 800)
}
</script>

<template>
  <div style="border: 1px solid var(--vk-border-color-light); border-radius: 12px; overflow: hidden;">
    <ConversationList height="280px" :loading-more="loading" @load-more="handleLoadMore">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :role="message.role"
        :timestamp="message.timestamp"
      >
        {{ message.content }}
      </ChatMessage>
    </ConversationList>
  </div>
</template>
