<script setup>
import { ref } from 'vue'
import Switch from '@/vue/components/Switch.vue'
const test = ref(false)
</script>
<template>
  <div class="switch-size-container">
    <Switch v-model="test" size="large"/>
    <Switch v-model="test"/>
    <Switch v-model="test" size="small"/>
  </div>
</template>
<style scoped>
.switch-size-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
}
</style>