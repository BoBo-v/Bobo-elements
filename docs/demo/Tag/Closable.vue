<script setup>
import Tag from '@/vue/components/Tag/Tag.vue'
</script>
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <Tag type="primary" closable>标签一</Tag>
    <Tag type="success" closable>标签二</Tag>
    <Tag type="warning" closable>标签三</Tag>
    <Tag type="danger" closable>标签四</Tag>
    <Tag type="info" closable>标签五</Tag>
  </div>
</template>
