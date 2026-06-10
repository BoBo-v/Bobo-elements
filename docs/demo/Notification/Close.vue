<script setup>
import { createNotification } from '@/vue/components/Notification/method'
import Button from '@/vue/components/Button.vue'
const open = () => {
  createNotification({ title: 'this is the title', content: 'hello world', showClose: true, duration: 0 })
}
</script>
<template>
<div class="basic block">
  <Button @click="open"> 可关闭通知 </Button>
</div>
</template>
