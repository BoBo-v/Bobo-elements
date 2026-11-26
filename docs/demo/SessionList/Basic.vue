<script setup>
import { ref } from 'vue'
import SessionList from '@/vue/components/SessionList.vue'

const activeId = ref('2')
const sessions = ref([
  { id: '1', title: '架构评审记录', pinned: true },
  { id: '2', title: 'AI 组件库规划', updatedAt: new Date() },
  { id: '3', title: 'SQL 慢查询排查', updatedAt: Date.now() - 86400000 * 3 }
])
</script>

<template>
  <div style="max-width: 280px;">
    <SessionList
      :items="sessions"
      :active-id="activeId"
      searchable
      @select="(item) => (activeId = item.id)"
    />
  </div>
</template>
