<template>
  <div class="vk-code-block" data-testid="code-block">
    <div v-if="title || language || copyable" class="vk-code-block__header">
      <span v-if="title || language" class="vk-code-block__language">
        {{ title || language }}
      </span>
      <span v-else />
      <button
        v-if="copyable"
        class="vk-code-block__copy-btn"
        data-testid="code-block-copy-btn"
        :aria-label="copied ? '已复制' : '复制代码'"
        @click="handleCopy"
      >
        {{ copied ? copiedText : copyText }}
      </button>
    </div>
    <div class="vk-code-block__body" :style="{ maxHeight }">
      <div v-if="showLineNumbers" class="vk-code-block__lines">
        <div class="vk-code-block__line-numbers">
          <span v-for="n in lineNumbers" :key="n" class="vk-code-block__line-number">{{ n }}</span>
        </div>
        <pre class="vk-code-block__code"><code v-html="highlightedHtml" /></pre>
      </div>
      <pre v-else class="vk-code-block__code"><code v-html="highlightedHtml" /></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import type { CodeBlockProps } from '../../core/components/code-block.types'
import { copyToClipboard, generateLineNumbers, highlightCode } from '../../core/components/code-block.logic'
import '../../components/CodeBlock/style.css'

defineOptions({ name: 'VkCodeBlock' })

const props = withDefaults(defineProps<CodeBlockProps>(), {
  code: '',
  language: '',
  showLineNumbers: false,
  copyable: true,
  maxHeight: '400px',
  copyText: '复制',
  copiedText: '已复制'
})

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

const lineNumbers = computed(() => generateLineNumbers(props.code))
const highlightedHtml = computed(() => highlightCode(props.code, props.language))

async function handleCopy() {
  try {
    await copyToClipboard(props.code)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // clipboard API may fail in insecure contexts
  }
}

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer)
})
</script>
