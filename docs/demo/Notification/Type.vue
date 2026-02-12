<script setup>
import { createNotification } from '@/components/Notification/method'
import Button from '@/components/Button/Button.vue'
const open = (type) => {
  createNotification({ title:'this is the title', message: 'hello world', type })
}
</script>
<template>
<div class="basic block">
  <Button @click="open('success')"> Success </Button>
  <Button @click="open('info')"> Info </Button>
  <Button @click="open('warning')"> warning </Button>
  <Button @click="open('danger')"> Danger </Button>
</div>
</template>
