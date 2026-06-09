<script setup>
import { ref } from 'vue'
import PromptInput from '@/vue/components/PromptInput.vue'

const value = ref('')

function handleSubmit(text) {
  alert('Submitted: ' + text)
  value.value = ''
}
</script>
<template>
  <PromptInput v-model="value" @submit="handleSubmit" />
</template>
