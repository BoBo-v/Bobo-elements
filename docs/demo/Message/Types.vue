<script setup>
import { createMessage } from '@/vue/components/Message/method'
import Button from '@/vue/components/Button.vue'
const open = (type) => {
  createMessage({ message: 'hello world', type })
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
