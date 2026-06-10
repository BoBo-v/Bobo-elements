<script setup>
import Tooltip from '@/vue/components/Tooltip/Tooltip.vue'
import Button from '@/vue/components/Button.vue'
</script>

<template>
  <div class="basic block">
    <Tooltip content="hello tooltip" trigger="click">
      <Button>点击激活 Tooltip</Button>
    </Tooltip>
  </div>
</template>
