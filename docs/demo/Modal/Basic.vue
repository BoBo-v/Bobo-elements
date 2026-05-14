<script setup>
import { ref } from 'vue'
import Modal from '@/vue/components/Modal/Modal.vue'
const visible = ref(false)
</script>
<template>
  <button class="vk-button vk-button--primary" @click="visible = true">打开弹窗</button>
  <Modal v-model="visible" title="基础弹窗">
    <p>这是一段弹窗内容。</p>
  </Modal>
</template>
