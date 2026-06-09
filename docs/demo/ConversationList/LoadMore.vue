<script setup>
import { ref } from 'vue'
import ConversationList from '@/vue/components/ConversationList.vue'
import ChatMessage from '@/vue/components/ChatMessage.vue'

const loading = ref(false)

function handleLoadMore() {
  loading.value = true
  setTimeout(() => { loading.value = false }, 1500)
}
</script>
<template>
  <div style="height: 200px; border: 1px solid var(--vk-border-color); border-radius: 4px;">
    <ConversationList max-height="200px" :loading-more="loading" @load-more="handleLoadMore">
      <ChatMessage role="assistant" :timestamp="new Date()">
        滚动到顶部加载更多历史消息...
      </ChatMessage>
    </ConversationList>
  </div>
</template>
