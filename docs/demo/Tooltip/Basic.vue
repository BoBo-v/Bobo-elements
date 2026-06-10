<script setup>
import Tooltip from '@/vue/components/Tooltip/Tooltip.vue'
import Button from '@/vue/components/Button.vue'
</script>

<template>
  <div class="basic block">
    <Tooltip content="hello tooltip">
      <Button>激活 Tooltip</Button>
    </Tooltip>
  </div>
</template>
