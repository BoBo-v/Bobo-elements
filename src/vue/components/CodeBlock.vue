<template>
  <div
    class="vk-code-block"
    :class="{
      'vk-code-block--light': theme === 'light',
      'is-collapsed': isCollapsed
    }"
    data-testid="code-block"
  >
    <div v-if="hasHeader" class="vk-code-block__header">
      <span v-if="title || language" class="vk-code-block__language">
        {{ title || language }}
      </span>
      <span v-else />
      <div class="vk-code-block__actions">
        <button
          v-if="showWrapToggle"
          type="button"
          class="vk-code-block__tool-btn"
          data-testid="code-block-wrap-btn"
          :aria-pressed="isWrapped"
          @click="toggleWrap"
        >
          {{ isWrapped ? unwrapText : wrapText }}
        </button>
        <button
          v-if="collapsible"
          type="button"
          class="vk-code-block__tool-btn"
          data-testid="code-block-collapse-btn"
          :aria-expanded="!isCollapsed"
          @click="toggleCollapse"
        >
          {{ isCollapsed ? expandText : collapseText }}
        </button>
        <button
          v-if="copyable"
          type="button"
          class="vk-code-block__copy-btn"
          data-testid="code-block-copy-btn"
          :aria-label="copied ? copiedText : copyText"
          @click="handleCopy"
        >
          {{ copied ? copiedText : copyText }}
        </button>
      </div>
    </div>
    <div
      v-show="!isCollapsed"
      class="vk-code-block__body"
      :style="{ maxHeight: scrollable ? maxHeight : undefined }"
    >
      <pre class="vk-code-block__code" :class="{ 'vk-code-block__code--wrap': isWrapped }"><code
        v-if="showLineNumbers"
        class="vk-code-block__table"
      ><span
        v-for="(lineHtml, idx) in codeLines"
        :key="idx"
        class="vk-code-block__row"
        :class="{ 'vk-code-block__line--highlighted': highlightLines?.includes(idx + 1) }"
      ><span class="vk-code-block__line-number">{{ idx + 1 }}</span><span class="vk-code-block__line-content" v-html="lineHtml || ' '" /></span></code><code v-else v-html="highlightedHtml" /></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import type { CodeBlockProps } from '../../core/components/code-block.types'
import { copyToClipboard, highlightCode, wrapLines } from '../../core/components/code-block.logic'
import '../../components/CodeBlock/style.css'

defineOptions({ name: 'VkCodeBlock' })

const props = withDefaults(defineProps<CodeBlockProps>(), {
  code: '',
  language: '',
  showLineNumbers: false,
  copyable: true,
  maxHeight: '500px',
  scrollable: true,
  wrap: false,
  theme: 'dark',
  copyText: '复制',
  copiedText: '已复制',
  showWrapToggle: false,
  collapsible: false,
  defaultCollapsed: false,
  wrapText: '自动换行',
  unwrapText: '取消换行',
  expandText: '展开',
  collapseText: '收起'
})

const copied = ref(false)
const isWrapped = ref(props.wrap)
const isCollapsed = ref(props.defaultCollapsed)
let copyTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.wrap, (val) => {
  isWrapped.value = val
})

const hasHeader = computed(() =>
  Boolean(props.title || props.language || props.copyable || props.showWrapToggle || props.collapsible)
)

const rawHighlightedHtml = computed(() => {
  if (props.highlighter) {
    return props.highlighter(props.code, props.language)
  }
  return highlightCode(props.code, props.language)
})

// 按行拆分以保证开启 showLineNumbers + wrap 时行号与代码严格同行对齐
const codeLines = computed(() => rawHighlightedHtml.value.split('\n'))

const highlightedHtml = computed(() => {
  const html = rawHighlightedHtml.value
  return props.highlightLines?.length ? wrapLines(html, props.highlightLines) : html
})

function toggleWrap() {
  isWrapped.value = !isWrapped.value
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

async function handleCopy() {
  try {
    await copyToClipboard(props.code)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // 忽略非安全上下文下的剪贴板权限错误
  }
}

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer)
})
</script>
