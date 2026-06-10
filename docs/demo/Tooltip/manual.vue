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
  <div class="basic block">
    <Tooltip
        content="hello tooltip"
        ref="tooltipRef"
        manual
    >
      <Button> 手动容器 </Button>
    </Tooltip>

    <br/><br/>
    <Button type="primary" @click="open"> 点击手动触发显示 </Button>
    <Button type="danger" @click="close"> 点击手动触发隐藏 </Button>
  </div>
</template>
