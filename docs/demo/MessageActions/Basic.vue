<script setup>
import { ref } from 'vue'
import MessageActions from '@/vue/components/MessageActions.vue'

const feedback = ref(null)
const branch = ref(1)
</script>

<template>
  <MessageActions
    content="这是可复制的 AI 回复内容"
    regenerable
    editable
    :feedback="feedback"
    :branch-index="branch"
    :branch-total="3"
    @feedback="(val) => (feedback = val)"
    @branch-change="(idx) => (branch = idx)"
  />
</template>
