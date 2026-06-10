<script setup>
import { ref } from 'vue'
import ConversationList from '@/vue/components/ConversationList.vue'
import ChatMessage from '@/vue/components/ChatMessage.vue'

let nextId = 1
const loading = ref(false)
const messages = ref([
  { id: nextId++, role: 'assistant', content: '历史消息 1：这是较早的一轮回复。', timestamp: new Date(Date.now() - 360000) },
  { id: nextId++, role: 'user', content: '历史消息 2：继续追问一个细节。', timestamp: new Date(Date.now() - 300000) },
  { id: nextId++, role: 'assistant', content: '历史消息 3：补充上下文和说明。', timestamp: new Date(Date.now() - 240000) },
  { id: nextId++, role: 'user', content: '当前问题：滚动到顶部加载更多历史消息。', timestamp: new Date(Date.now() - 180000) },
  { id: nextId++, role: 'assistant', content: '向上滚动到顶部会触发 load-more。', timestamp: new Date(Date.now() - 120000) },
  { id: nextId++, role: 'assistant', content: '加载中状态会阻止重复触发。', timestamp: new Date(Date.now() - 60000) }
])

function handleLoadMore() {
  if (loading.value) return
  loading.value = true
  setTimeout(() => {
    const older = [
      { id: nextId++, role: 'assistant', content: '更早的历史消息：组件会把它插入到顶部。', timestamp: new Date(Date.now() - 480000) },
      { id: nextId++, role: 'user', content: '更早的用户提问。', timestamp: new Date(Date.now() - 420000) }
    ]
    messages.value = [...older, ...messages.value]
    loading.value = false
  }, 900)
}
</script>

<template>
  <ConversationList height="200px" :loading-more="loading" @load-more="handleLoadMore">
    <ChatMessage
      v-for="message in messages"
      :key="message.id"
      :role="message.role"
      :timestamp="message.timestamp"
    >
      {{ message.content }}
    </ChatMessage>
  </ConversationList>
</template>
