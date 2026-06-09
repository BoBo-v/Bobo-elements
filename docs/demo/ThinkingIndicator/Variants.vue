<script setup>
import ThinkingIndicator from '@/vue/components/ThinkingIndicator.vue'
</script>
<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <ThinkingIndicator variant="dots" text="Dots" />
    <ThinkingIndicator variant="pulse" text="Pulse" />
    <ThinkingIndicator variant="wave" text="Wave" />
  </div>
</template>
