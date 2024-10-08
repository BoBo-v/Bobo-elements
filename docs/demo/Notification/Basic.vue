<script setup>
import { h } from 'vue'
import { createNotification } from '@/components/Notification/method'
import Button from '@/components/Button/Button.vue'
const open = () => {
  createNotification({ title:'this is the title', message: 'hello world' })
}
const open2 = () => {
  createNotification({ title:'this is the title', message: h('b', 'this is bold') })
}
</script>
<template>
<div class="basic block">
  <Button type="primary" @click="open"> 创建一条通知 </Button>
  <Button  @click="open2"> 创建支持 VNode 的通知 </Button>
</div>
</template>
