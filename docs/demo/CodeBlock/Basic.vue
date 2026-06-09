<script setup>
import CodeBlock from '@/vue/components/CodeBlock.vue'

const code = `function greet(name) {
  console.log(\`Hello, \${name}!\`)
  return true
}

greet('World')`
</script>
<template>
  <CodeBlock :code="code" language="javascript" />
</template>
