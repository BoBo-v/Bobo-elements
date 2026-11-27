<script setup>
import Button from '@/vue/components/Button.vue'
</script>

<template>
  <div class="btn-demo-row">
    <Button size="large">Large</Button>
    <Button type="primary">Default</Button>
    <Button type="success" size="small">Small</Button>
  </div>
</template>
<style scoped>
.btn-demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
}

.btn-demo-row :deep(.vk-button + .vk-button) {
  margin-left: 0;
}
</style>
