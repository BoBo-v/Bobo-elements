<script setup>
import Tag from '@/vue/components/Tag/Tag.vue'
</script>
<template>
  <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
    <Tag type="primary" size="large">大标签</Tag>
    <Tag type="primary">默认标签</Tag>
    <Tag type="primary" size="small">小标签</Tag>
  </div>
</template>
