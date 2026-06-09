<script setup>
import TokenBadge from '@/vue/components/TokenBadge.vue'
</script>
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <TokenBadge :used="1200" :total="4000" />
    <TokenBadge :used="3500" :total="4000" status="warning" />
    <TokenBadge :used="4200" :total="4000" status="danger" />
  </div>
</template>
