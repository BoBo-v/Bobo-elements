<script setup>
import ChatMessage from '@/vue/components/ChatMessage.vue'

function handleRetry() {
  alert('重试发送')
}
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <ChatMessage role="user" :timestamp="new Date()">
      帮我写一段代码
    </ChatMessage>
    <ChatMessage role="assistant" status="error" @retry="handleRetry" />
  </div>
</template>
