<script setup>
import MarkdownRenderer from '@/vue/components/MarkdownRenderer.vue'

const content = `# Hello AI

This is a **Markdown** renderer component.

## Features

- Supports *italic* and **bold**
- Inline \`code\` and code blocks
- Links: [Example](https://example.com)

> This is a blockquote

\`\`\`javascript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`
`
</script>
<template>
  <div style="padding: 16px; border: 1px solid var(--vk-border-color); border-radius: 4px;">
    <MarkdownRenderer :content="content" />
  </div>
</template>
