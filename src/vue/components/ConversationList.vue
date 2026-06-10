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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { ConversationListProps, ConversationListEmits, ConversationListInstance } from '../../core/components/conversation-list.types'
import '../../components/ConversationList/style.css'

defineOptions({ name: 'VkConversationList' })

const props = withDefaults(defineProps<ConversationListProps>(), {
  autoScroll: true,
  loadingMore: false,
  height: undefined,
  maxHeight: '100%',
  preserveScrollOnPrepend: true,
  emptyText: '暂无对话',
  loadingText: '加载中...'
})

const emits = defineEmits<ConversationListEmits>()
const containerRef = ref<HTMLElement | null>(null)
let observer: MutationObserver | null = null
let resizeObserver: ResizeObserver | null = null
let shouldStickToBottom = true
let previousScrollHeight = 0

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

function getElement() {
  return containerRef.value
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
    previousScrollHeight = containerRef.value.scrollHeight
    shouldStickToBottom = isNearBottom()
    observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0)
      if (!hasAddedNodes) return
      const el = containerRef.value
      if (!el) return
      const oldScrollHeight = previousScrollHeight
      nextTick(() => {
        if (props.autoScroll && shouldStickToBottom) {
          scrollToBottom()
        } else if (props.preserveScrollOnPrepend && el.scrollTop <= SCROLL_THRESHOLD && el.scrollHeight > oldScrollHeight) {
          el.scrollTop = el.scrollHeight - oldScrollHeight
        }
        previousScrollHeight = el.scrollHeight
        shouldStickToBottom = isNearBottom()
      })
    })
    observer.observe(containerRef.value, { childList: true, subtree: true })
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        const el = containerRef.value
        if (!el) return
        if (props.autoScroll && shouldStickToBottom) {
          scrollToBottom()
        }
        previousScrollHeight = el.scrollHeight
        shouldStickToBottom = isNearBottom()
      })
      resizeObserver.observe(containerRef.value)
    }
  }
})

onUnmounted(() => {
  observer?.disconnect()
  resizeObserver?.disconnect()
})

defineExpose<ConversationListInstance>({ scrollToBottom, getElement })
</script>
