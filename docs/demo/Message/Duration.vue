<script setup>
import { createMessage } from '@/vue/components/Message/method'
import Button from '@/vue/components/Button.vue'

const open = () => {
  createMessage({ message: 'hello world', showClose: true, duration: 0 })
}
</script>

<template>
  <div class="basic block">
    <Button @click="open">可关闭消息</Button>
  </div>
</template>
