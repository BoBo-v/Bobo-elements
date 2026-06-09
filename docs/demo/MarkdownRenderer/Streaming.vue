<script setup>
import { ref, onUnmounted } from 'vue'
import MarkdownRenderer from '@/vue/components/MarkdownRenderer.vue'
import StreamingText from '@/vue/components/StreamingText.vue'

const fullText = `## Streaming + Markdown

This text is being **streamed** character by character.

- Item one
- Item two

\`code example\``

const text = ref('')
let idx = 0
const timer = setInterval(() => {
  idx++
  text.value = fullText.slice(0, idx)
  if (idx >= fullText.length) clearInterval(timer)
}, 60)

onUnmounted(() => clearInterval(timer))
</script>
<template>
  <div style="padding: 16px; border: 1px solid var(--vk-border-color); border-radius: 4px;">
    <MarkdownRenderer :content="text" />
    <StreamingText :text="''" :show-cursor="false" />
  </div>
</template>
