<script setup>
import Tooltip from '@/vue/components/Tooltip/Tooltip.vue'
import Button from '@/vue/components/Button.vue'
</script>
<template>
  <div class="basic block">
    <Tooltip
        trigger="click"
    >
      <Button> 复杂 HTML 结构的Tooltip </Button>
      <template #content>
        <h3> this is the title</h3>
        <p> this is the content </p>
      </template>
    </Tooltip>
  </div>
</template>
