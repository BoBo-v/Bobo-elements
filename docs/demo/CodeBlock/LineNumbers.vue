<script setup>
import CodeBlock from '@/vue/components/CodeBlock.vue'

const code = `import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}`
</script>
<template>
  <CodeBlock :code="code" language="typescript" title="counter.ts" show-line-numbers />
</template>
