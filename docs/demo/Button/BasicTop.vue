<script setup>
import Button from '@/vue/components/Button.vue'
import Icon from '@/vue/components/Icon.vue'
</script>
<template>
  <div class="btn-demo-stack">
    <div class="btn-demo-row">
      <Button>默认按钮</Button>
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
      <Button type="info">Info</Button>
    </div>

    <div class="btn-demo-row">
      <Button plain>朴素按钮</Button>
      <Button type="primary" plain>Primary</Button>
      <Button type="success" plain>Success</Button>
      <Button type="warning" plain>Warning</Button>
      <Button type="danger" plain>Danger</Button>
      <Button type="info" plain>Info</Button>
    </div>

    <div class="btn-demo-row">
      <Button round>圆角按钮</Button>
      <Button type="primary" round>Primary</Button>
      <Button type="success" round>Success</Button>
      <Button type="warning" round>Warning</Button>
      <Button type="danger" round>Danger</Button>
      <Button type="info" round>Info</Button>
    </div>

    <div class="btn-demo-row">
      <Button circle><Icon icon="star" /></Button>
      <Button type="primary" circle><Icon icon="star" /></Button>
      <Button type="success" circle><Icon icon="star" /></Button>
      <Button type="warning" circle><Icon icon="star" /></Button>
      <Button type="danger" circle><Icon icon="star" /></Button>
      <Button type="info" circle><Icon icon="star" /></Button>
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
