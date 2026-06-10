<script setup>
import { ref } from 'vue'
import Modal from '@/vue/components/Modal/Modal.vue'
import Button from '@/vue/components/Button.vue'

const visible = ref(false)
</script>

<template>
  <Button type="primary" @click="visible = true">自定义底部</Button>
  <Modal v-model="visible" title="自定义底部">
    <p>可以通过 footer 插槽自定义底部内容。</p>
    <template #footer>
      <Button @click="visible = false">我知道了</Button>
      <Button type="danger" @click="visible = false">删除</Button>
    </template>
  </Modal>
</template>
