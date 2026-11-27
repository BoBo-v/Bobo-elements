<script setup>
import { ref } from 'vue'
import Input from '@/vue/components/Input/Input.vue'
const test = ref('')
</script>
<template>
  <div class="size-holder">
    <Input v-model="test" placeholder="大的 Input" size="large">
    </Input>
    <Input v-model="test" placeholder="普通的 Input">
    </Input>
    <Input v-model="test" placeholder="小的 Input" size="small">
    </Input>
  </div>
</template>
<style scoped>
.size-holder {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.size-holder :deep(.vk-input) {
  flex: 1 1 180px;
  min-width: 0;
}
</style>