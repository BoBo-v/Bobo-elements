<script setup>
import { ref } from 'vue'
import Tooltip from '@/vue/components/Tooltip/Tooltip.vue'
import Button from '@/vue/components/Button.vue'

const tooltipRef = ref()
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
</script>
<template>
  <div class="tooltip-manual-demo">
    <div>
      <Tooltip
          content="hello tooltip"
          ref="tooltipRef"
          manual
      >
        <Button>手动容器</Button>
      </Tooltip>
    </div>

    <div class="tooltip-manual-actions">
      <Button type="primary" @click="open">点击手动触发显示</Button>
      <Button type="danger" @click="close">点击手动触发隐藏</Button>
    </div>
  </div>
</template>
<style scoped>
.tooltip-manual-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tooltip-manual-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
}

.tooltip-manual-actions :deep(.vk-button + .vk-button) {
  margin-left: 0;
}
</style>
