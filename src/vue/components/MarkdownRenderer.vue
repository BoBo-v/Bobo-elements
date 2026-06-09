<template>
  <component
    :is="tag"
    class="vk-markdown-renderer"
    v-html="html"
    data-testid="markdown-renderer"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MarkdownRendererProps } from '../../core/components/markdown-renderer.types'
import { parseMarkdown } from '../../core/components/markdown-renderer.logic'
import '../../components/MarkdownRenderer/style.css'

defineOptions({ name: 'VkMarkdownRenderer' })

const props = withDefaults(defineProps<MarkdownRendererProps>(), {
  content: '',
  tag: 'div',
  breaks: true
})

const html = computed(() => parseMarkdown(props.content, props.breaks))
</script>
