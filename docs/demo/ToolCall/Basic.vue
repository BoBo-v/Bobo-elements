<script setup>
import { ref } from 'vue'
import ToolCall from '@/vue/components/ToolCall.vue'

const status = ref('awaiting-approval')
</script>

<template>
  <ToolCall
    title="查询生产数据库"
    tool-name="run_sql"
    :status="status"
    :duration="240"
    :default-expanded="true"
    :args="{ sql: 'SELECT id, name FROM users LIMIT 5' }"
    :result="status === 'success' ? { rows: 5 } : undefined"
    @approve="status = 'success'"
    @reject="status = 'error'"
  />
</template>
