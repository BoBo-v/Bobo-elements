<script setup>
import ChatMessage from '@/vue/components/ChatMessage.vue'
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <ChatMessage role="user" :timestamp="new Date()">
      解释一下量子计算
    </ChatMessage>
    <ChatMessage role="assistant" status="streaming" />
  </div>
</template>
