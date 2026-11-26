<template>
  <div
    class="vk-markdown-renderer"
    v-html="html"
    data-testid="markdown-renderer"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import type { MarkdownRendererProps } from '../../core/components/markdown-renderer.types'
import { parseMarkdown } from '../../core/components/markdown-renderer.logic'
import { copyToClipboard } from '../../core/components/code-block.logic'
import '../../components/MarkdownRenderer/style.css'

defineOptions({ name: 'VkMarkdownRenderer' })

const props = withDefaults(defineProps<MarkdownRendererProps>(), {
  content: '',
  breaks: true,
  streaming: false,
  codeCopyable: true,
  codeCopyText: '复制',
  codeCopiedText: '已复制'
})

const emits = defineEmits<{
  (e: 'link-click', href: string, event: MouseEvent): void
}>()

const activeTimers = new Set<ReturnType<typeof setTimeout>>()

const html = computed(() =>
  parseMarkdown(props.content, {
    breaks: props.breaks,
    streaming: props.streaming,
    codeCopyable: props.codeCopyable,
    codeCopyText: props.codeCopyText
  })
)

async function handleClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null
  if (!target) return

  const copyBtn = target.closest('.vk-md-code-copy') as HTMLButtonElement | null
  if (copyBtn) {
    const encoded = copyBtn.getAttribute('data-md-copy') || ''
    try {
      await copyToClipboard(decodeURIComponent(encoded))
      copyBtn.textContent = props.codeCopiedText
      copyBtn.setAttribute('aria-label', props.codeCopiedText)
      const timer = setTimeout(() => {
        copyBtn.textContent = props.codeCopyText
        copyBtn.setAttribute('aria-label', props.codeCopyText)
        activeTimers.delete(timer)
      }, 2000)
      activeTimers.add(timer)
    } catch {
      // 忽略剪贴板权限异常
    }
    return
  }

  const linkEl = target.closest('a.vk-md-link') as HTMLAnchorElement | null
  if (linkEl) {
    const href = linkEl.getAttribute('href') || ''
    emits('link-click', href, event)
  }
}

onUnmounted(() => {
  activeTimers.forEach(clearTimeout)
  activeTimers.clear()
})
</script>
