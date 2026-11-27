<script setup>
import Button from '@/vue/components/Button.vue'
</script>
<template>
  <div class="btn-demo-stack">
    <div class="btn-demo-row">
      <Button disabled>默认按钮</Button>
      <Button type="primary" disabled>Primary</Button>
      <Button type="success" disabled>Success</Button>
      <Button type="warning" disabled>Warning</Button>
      <Button type="danger" disabled>Danger</Button>
      <Button type="info" disabled>Info</Button>
    </div>

    <div class="btn-demo-row">
      <Button plain disabled>朴素按钮</Button>
      <Button type="primary" disabled plain>Primary</Button>
      <Button type="success" plain disabled>Success</Button>
      <Button type="warning" plain disabled>Warning</Button>
      <Button type="danger" plain disabled>Danger</Button>
      <Button type="info" plain disabled>Info</Button>
    </div>
  </div>
</template>
<style scoped>
.btn-demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

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
