<script setup>
import ConversationList from '@/vue/components/ConversationList.vue'
import ChatMessage from '@/vue/components/ChatMessage.vue'
</script>
<template>
  <div style="border: 1px solid var(--vk-border-color); border-radius: 4px;">
    <ConversationList height="300px">
      <ChatMessage role="user" :timestamp="new Date(Date.now() - 120000)">
        你好，我想学习 Vue 3
      </ChatMessage>
      <ChatMessage role="assistant" :timestamp="new Date(Date.now() - 60000)">
        你好！很高兴你想学习 Vue 3。Vue 3 是一个渐进式 JavaScript 框架，它的核心特性包括组合式 API、更好的 TypeScript 支持和性能优化。
      </ChatMessage>
      <ChatMessage role="user" :timestamp="new Date()">
        能给我一个简单的例子吗？
      </ChatMessage>
      <ChatMessage role="assistant" :timestamp="new Date()">
        当然可以！下面是一个最简单的 Vue 3 组件示例。
      </ChatMessage>
    </ConversationList>
  </div>
</template>
