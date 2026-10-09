<script setup>
import { ref } from 'vue'
import Select from '@/vue/components/Select/Select.vue'
const test = ref('')

const handleFetch = (query) => {
  if (!query) return Promise.resolve([])
  return fetch(`https://api.github.com/search/repositories?q=${query}`)
  .then(res => res.json())
  .then(( { items }) => {
    return items.slice(0, 10).map(item => ({ label: item.name, value: item.node_id }))
  })
}
</script>
<template>
  <Select 
    v-model="test" 
    placeholder="搜索远程结果"
    filterable
    remote
    :remote-method="handleFetch"
  />
</template>