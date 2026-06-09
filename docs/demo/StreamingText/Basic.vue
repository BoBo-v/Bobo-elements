<script setup>
import { ref, onUnmounted } from 'vue'
import StreamingText from '@/vue/components/StreamingText.vue'

const text = ref('')
const fullText = '你好！我是 AI 助手，很高兴为你服务。有什么我可以帮助你的吗？'
let idx = 0
const timer = setInterval(() => {
  idx++
  text.value = fullText.slice(0, idx)
  if (idx >= fullText.length) {
    clearInterval(timer)
  }
}, 80)

onUnmounted(() => clearInterval(timer))
</script>
<template>
  <div style="padding: 12px; border: 1px solid var(--vk-border-color); border-radius: 4px;">
    <StreamingText :text="text" :speed="2" :interval="50" />
  </div>
</template>
