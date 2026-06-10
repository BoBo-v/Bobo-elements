<script setup>
import Tooltip from '@/vue/components/Tooltip/Tooltip.vue'
import Button from '@/vue/components/Button.vue'
</script>
<template>
  <div class="basic block">
    <Tooltip
        content="hello tooltip"
        placement="top-start"
    >
      <Button> top-start </Button>
    </Tooltip>

    <Tooltip
        content="hello tooltip"
        placement="bottom-start"
    >
      <Button> bottom-start </Button>
    </Tooltip>

    <Tooltip
        content="hello tooltip"
        placement="left-start"
    >
      <Button> left-start </Button>
    </Tooltip>

    <Tooltip
        content="hello tooltip"
        placement="right-start"
    >
      <Button> right-start </Button>
    </Tooltip>
  </div>
</template>
<style scoped>
.vk-button {
  margin-right: 20px;
}
</style>
