<script setup>
import ThinkingIndicator from '@/vue/components/ThinkingIndicator.vue'
</script>
<template>
  <div style="display: flex; gap: 24px; align-items: center;">
    <ThinkingIndicator size="small" text="Small" />
    <ThinkingIndicator size="default" text="Default" />
    <ThinkingIndicator size="large" text="Large" />
  </div>
</template>
