<script setup>
import DiffCodeBlock from '@/vue/components/DiffCodeBlock.vue'

const oldCode = `function greet(name: string) {
  return 'Hello ' + name
}`

const newCode = `function greet(name: string) {
  return \`Hello, \${name}!\`
}`
</script>

<template>
  <DiffCodeBlock
    title="greet.ts"
    :old-code="oldCode"
    :new-code="newCode"
    actionable
  />
</template>
