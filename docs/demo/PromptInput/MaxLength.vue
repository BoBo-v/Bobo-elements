<script setup>
import { ref } from 'vue'
import PromptInput from '@/vue/components/PromptInput.vue'

const value = ref('')
</script>
<template>
  <PromptInput v-model="value" :max-length="200" show-count />
</template>
