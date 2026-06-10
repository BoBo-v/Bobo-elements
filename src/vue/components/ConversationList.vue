<template>
  <div
    ref="containerRef"
    class="vk-conversation-list"
    :style="{ height, maxHeight }"
    role="log"
    aria-live="polite"
    data-testid="conversation-list"
    @scroll="handleScroll"
  >
    <div v-if="loadingMore" class="vk-conversation-list__load-more" data-testid="conversation-list-loading">
      <span class="vk-conversation-list__loading-spinner" />
      {{ loadingText }}
    </div>
    <div class="vk-conversation-list__content">
      <slot />
    </div>
    <div v-if="!$slots.default" class="vk-conversation-list__empty" data-testid="conversation-list-empty">
      {{ emptyText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { ConversationListProps, ConversationListEmits } from '../../core/components/conversation-list.types'
import '../../components/ConversationList/style.css'

defineOptions({ name: 'VkConversationList' })

const props = withDefaults(defineProps<ConversationListProps>(), {
  autoScroll: true,
  loadingMore: false,
  height: undefined,
  maxHeight: '100%',
  emptyText: '暂无对话',
  loadingText: '加载中...'
})

const emits = defineEmits<ConversationListEmits>()
const containerRef = ref<HTMLElement | null>(null)
let observer: MutationObserver | null = null
let shouldStickToBottom = true

const SCROLL_THRESHOLD = 50

function isNearBottom(): boolean {
  const el = containerRef.value
  if (!el) return true
  return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD
}

function scrollToBottom() {
  const el = containerRef.value
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}

function handleScroll() {
  const el = containerRef.value
  if (!el) return
  shouldStickToBottom = isNearBottom()
  emits('scroll', el.scrollTop)
  if (el.scrollTop === 0 && !props.loadingMore) {
    emits('load-more')
  }
}

onMounted(() => {
  if (containerRef.value) {
    shouldStickToBottom = isNearBottom()
    observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0)
      if (props.autoScroll && hasAddedNodes && shouldStickToBottom) {
        scrollToBottom()
      }
      shouldStickToBottom = isNearBottom()
    })
    observer.observe(containerRef.value, { childList: true, subtree: true })
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
