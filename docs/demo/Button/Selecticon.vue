<script setup>
import Button from '@/vue/components/Button.vue'
</script>
<template>
  <div class="btn-demo-row">
    <Button icon="star">Star Button</Button>
    <Button type="primary" icon="magnifying-glass">Search</Button>
    <Button type="success" plain icon="check">Confirm</Button>
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
