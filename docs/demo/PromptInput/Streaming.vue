<script setup>
import { ref } from 'vue'
import PromptInput from '@/vue/components/PromptInput.vue'

const value = ref('')
</script>
<template>
  <PromptInput v-model="value" streaming />
</template>
