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
    <div ref="contentRef" class="vk-conversation-list__content">
      <slot />
    </div>
    <div v-if="!$slots.default" class="vk-conversation-list__empty" data-testid="conversation-list-empty">
      {{ emptyText }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
const contentRef = ref<HTMLElement | null>(null)
let observer: MutationObserver | null = null
let resizeObserver: ResizeObserver | null = null
let shouldStickToBottom = true
let previousScrollHeight = 0
let rafId: number | null = null
let pendingHasAddedNodes = false
let snapshotScrollTop = 0
let snapshotScrollHeight = 0

const SCROLL_THRESHOLD = 50

function isNearBottom(): boolean {
  const el = containerRef.value
  if (!el) return true
  return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD
}

function scrollToBottom(instant = false) {
  const el = containerRef.value
  if (el) {
    if (instant && typeof el.scrollTo === 'function') {
      el.scrollTo({ top: el.scrollHeight, behavior: 'instant' as ScrollBehavior })
    } else {
      el.scrollTop = el.scrollHeight
    }
  }
}

function getElement() {
  return containerRef.value
}

function handleScroll() {
  const el = containerRef.value
  if (!el) return
  if (previousScrollHeight === 0 && el.scrollHeight > 0) {
    previousScrollHeight = el.scrollHeight
  }
  shouldStickToBottom = isNearBottom()
  emits('scroll', el.scrollTop)
  if (el.scrollTop === 0 && !props.loadingMore) {
    emits('load-more')
  }
}

function scheduleUpdate(hasAddedNodes = false) {
  if (hasAddedNodes) {
    pendingHasAddedNodes = true
  }

  const el = containerRef.value
  if (!el) return

  if (rafId === null) {
    snapshotScrollTop = el.scrollTop
    snapshotScrollHeight = previousScrollHeight > 0 ? previousScrollHeight : el.scrollHeight
  }

  if (rafId !== null) return

  rafId = requestAnimationFrame(() => {
    rafId = null
    const currentEl = containerRef.value
    if (!currentEl) return

    const newScrollHeight = currentEl.scrollHeight
    const wasPrepend = pendingHasAddedNodes
    pendingHasAddedNodes = false
    const oldScrollTop = snapshotScrollTop
    const oldScrollHeight = snapshotScrollHeight

    if (
      props.preserveScrollOnPrepend &&
      wasPrepend &&
      !shouldStickToBottom &&
      oldScrollTop <= SCROLL_THRESHOLD &&
      newScrollHeight > oldScrollHeight
    ) {
      const diff = newScrollHeight - oldScrollHeight
      const targetScrollTop = oldScrollTop + diff
      if (typeof currentEl.scrollTo === 'function') {
        currentEl.scrollTo({ top: targetScrollTop, behavior: 'instant' as ScrollBehavior })
      } else {
        currentEl.scrollTop = targetScrollTop
      }
    } else if (props.autoScroll && shouldStickToBottom) {
      scrollToBottom(true)
    }

    previousScrollHeight = currentEl.scrollHeight
    shouldStickToBottom = isNearBottom()
  })
}

onMounted(() => {
  if (containerRef.value) {
    previousScrollHeight = containerRef.value.scrollHeight
    shouldStickToBottom = isNearBottom()

    observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0)
      scheduleUpdate(hasAddedNodes)
    })
    observer.observe(containerRef.value, { childList: true, subtree: true, characterData: true })

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleUpdate(false)
      })
      const target = contentRef.value || containerRef.value
      resizeObserver.observe(target)
    }
  }
})

onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
  observer?.disconnect()
  resizeObserver?.disconnect()
})

defineExpose<ConversationListInstance>({ scrollToBottom, getElement })
</script>
