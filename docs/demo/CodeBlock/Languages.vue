<script setup>
import CodeBlock from '@/vue/components/CodeBlock.vue'

const pyCode = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`

const cssCode = `.container {
  display: flex;
  gap: 16px;
  padding: 24px;
}`
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <CodeBlock :code="pyCode" language="python" title="fib.py" />
    <CodeBlock :code="cssCode" language="css" title="style.css" />
  </div>
</template>
