<script setup>
import { ref } from 'vue'
import Prompts from '@/vue/components/Prompts.vue'

const selected = ref('')
const items = [
  { key: '1', label: '写一个 TypeScript 防抖函数', icon: 'code' },
  { key: '2', label: '解释 Vue3 响应式原理', icon: 'bolt' },
  { key: '3', label: '生成单元测试用例', icon: 'vial' }
]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Prompts
      title="推荐提问"
      :items="items"
      layout="horizontal"
      variant="pill"
      @select="(item) => (selected = item.label)"
    />
    <div v-if="selected" style="font-size: 13px; color: var(--vk-text-color-secondary);">
      已选择：{{ selected }}
    </div>
  </div>
</template>
