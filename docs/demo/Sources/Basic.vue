<script setup>
import Sources from '@/vue/components/Sources.vue'

const items = [
  {
    id: '1',
    title: 'Vue 3 组合式 API 指南',
    url: 'https://cn.vuejs.org/',
    domain: 'cn.vuejs.org',
    snippet: '通过组合式 API 更灵活地组织和复用组件逻辑。'
  },
  {
    id: '2',
    title: 'React 官方文档',
    url: 'https://react.dev/',
    domain: 'react.dev',
    snippet: '用于构建 Web 和原生交互界面的库。'
  }
]
</script>

<template>
  <Sources :items="items" variant="cards" :default-expanded="true" />
</template>
