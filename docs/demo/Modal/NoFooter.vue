<script setup>
import { ref } from 'vue'
import Modal from '@/vue/components/Modal/Modal.vue'
const visible = ref(false)
</script>
<template>
  <button class="vk-button vk-button--primary" @click="visible = true">无底部弹窗</button>
  <Modal v-model="visible" title="提示" :show-footer="false">
    <p>这个弹窗没有底部按钮区域。</p>
  </Modal>
</template>
