<script setup>
import StreamingText from '@/vue/components/StreamingText.vue'
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div>
      <p style="font-size: 12px; color: var(--vk-text-color-secondary); margin-bottom: 4px;">speed: 1 (默认)</p>
      <StreamingText text="这是速度为1的流式文本效果" :speed="1" :interval="50" />
    </div>
    <div>
      <p style="font-size: 12px; color: var(--vk-text-color-secondary); margin-bottom: 4px;">speed: 3</p>
      <StreamingText text="这是速度为3的流式文本效果" :speed="3" :interval="50" />
    </div>
  </div>
</template>
