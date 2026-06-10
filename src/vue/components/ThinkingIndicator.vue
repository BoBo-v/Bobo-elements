<template>
  <div
    class="vk-thinking-indicator"
    :class="[
      size !== 'default' ? `vk-thinking-indicator--${size}` : '',
      `vk-thinking-indicator--${color}`
    ]"
    role="status"
    aria-live="polite"
    :aria-label="ariaLabel"
  >
    <div v-if="variant === 'dots'" class="vk-thinking-indicator__dots">
      <span class="vk-thinking-indicator__dot" />
      <span class="vk-thinking-indicator__dot" />
      <span class="vk-thinking-indicator__dot" />
    </div>
    <div v-else-if="variant === 'pulse'" class="vk-thinking-indicator__pulse" />
    <div v-else-if="variant === 'wave'" class="vk-thinking-indicator__wave">
      <span class="vk-thinking-indicator__wave-bar" />
      <span class="vk-thinking-indicator__wave-bar" />
      <span class="vk-thinking-indicator__wave-bar" />
      <span class="vk-thinking-indicator__wave-bar" />
      <span class="vk-thinking-indicator__wave-bar" />
    </div>
    <span v-if="text" class="vk-thinking-indicator__text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import type { ThinkingIndicatorProps } from '../../core/components/thinking-indicator.types'
import '../../components/ThinkingIndicator/style.css'

defineOptions({ name: 'VkThinkingIndicator' })

withDefaults(defineProps<ThinkingIndicatorProps>(), {
  variant: 'dots',
  size: 'default',
  color: 'primary',
  text: '正在思考...',
  ariaLabel: 'AI 正在思考'
})
</script>
