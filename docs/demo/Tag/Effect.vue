<script setup>
import Tag from '@/vue/components/Tag/Tag.vue'
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; gap: 10px;">
      <Tag type="primary" effect="dark">Dark</Tag>
      <Tag type="success" effect="dark">Dark</Tag>
      <Tag type="warning" effect="dark">Dark</Tag>
      <Tag type="danger" effect="dark">Dark</Tag>
      <Tag type="info" effect="dark">Dark</Tag>
    </div>
    <div style="display: flex; gap: 10px;">
      <Tag type="primary" effect="light">Light</Tag>
      <Tag type="success" effect="light">Light</Tag>
      <Tag type="warning" effect="light">Light</Tag>
      <Tag type="danger" effect="light">Light</Tag>
      <Tag type="info" effect="light">Light</Tag>
    </div>
    <div style="display: flex; gap: 10px;">
      <Tag type="primary" effect="plain">Plain</Tag>
      <Tag type="success" effect="plain">Plain</Tag>
      <Tag type="warning" effect="plain">Plain</Tag>
      <Tag type="danger" effect="plain">Plain</Tag>
      <Tag type="info" effect="plain">Plain</Tag>
    </div>
  </div>
</template>
