<script setup>
import { ref } from 'vue'
import Switch from '@/vue/components/Switch.vue'
const test = ref(false)
</script>
<template>
  <Switch v-model="test" />
</template>