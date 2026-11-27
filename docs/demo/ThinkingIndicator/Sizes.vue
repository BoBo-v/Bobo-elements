<script setup>
import ThinkingIndicator from '@/vue/components/ThinkingIndicator.vue'
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: center;">
    <ThinkingIndicator size="small" text="Small" />
    <ThinkingIndicator size="default" text="Default" />
    <ThinkingIndicator size="large" text="Large" />
  </div>
</template>
