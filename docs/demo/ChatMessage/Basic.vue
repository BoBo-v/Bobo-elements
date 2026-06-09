<script setup>
import ChatMessage from '@/vue/components/ChatMessage.vue'
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <ChatMessage role="user" :timestamp="new Date()">
      你好，请帮我解释一下什么是 Vue 3 的组合式 API？
    </ChatMessage>
    <ChatMessage role="assistant" :timestamp="new Date()">
      组合式 API 是 Vue 3 引入的一种新的组件编写方式，它允许你使用函数来组织组件逻辑，而不是依赖选项对象。
    </ChatMessage>
  </div>
</template>
