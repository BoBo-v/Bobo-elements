<script setup>
import TokenBadge from '@/vue/components/TokenBadge.vue'
</script>
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <TokenBadge :used="500" />
    <TokenBadge :used="1500000" :total="2000000" prefix="字符" />
  </div>
</template>
