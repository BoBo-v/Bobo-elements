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
      <slot name="empty">{{ emptyText }}</slot>
    </div>
    <button
      v-if="showScrollToBottom && $slots.default && !isAtBottom"
      type="button"
      class="vk-conversation-list__scroll-btn"
      data-testid="conversation-list-scroll-btn"
      :aria-label="scrollToBottomText"
      @click="scrollToBottom(false)"
    >
      ↓ {{ scrollToBottomText }}
    </button>
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
  loadMoreThreshold: 16,
  height: undefined,
  maxHeight: '100%',
  preserveScrollOnPrepend: true,
  showScrollToBottom: true,
  scrollToBottomText: '回到底部',
  emptyText: '暂无对话',
  loadingText: '加载中...'
})

const emits = defineEmits<ConversationListEmits>()
const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const isAtBottom = ref(true)
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

function updateAtBottom(next: boolean) {
  if (isAtBottom.value !== next) {
    isAtBottom.value = next
    emits('at-bottom-change', next)
  }
}

function scrollToBottom(instant = false) {
  const el = containerRef.value
  if (el) {
    if (instant && typeof el.scrollTo === 'function') {
      el.scrollTo({ top: el.scrollHeight, behavior: 'instant' as ScrollBehavior })
    } else {
      el.scrollTop = el.scrollHeight
    }
    shouldStickToBottom = true
    updateAtBottom(true)
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
  const nearBottom = isNearBottom()
  shouldStickToBottom = nearBottom
  updateAtBottom(nearBottom)
  emits('scroll', el.scrollTop)
  if (el.scrollTop <= props.loadMoreThreshold && !props.loadingMore) {
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
      // 历史消息前插时根据内容高度差补偿滚动锚点，消除视口跳动
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
    const nearBottom = isNearBottom()
    shouldStickToBottom = nearBottom
    updateAtBottom(nearBottom)
  })
}

onMounted(() => {
  if (containerRef.value) {
    previousScrollHeight = containerRef.value.scrollHeight
    const nearBottom = isNearBottom()
    shouldStickToBottom = nearBottom
    isAtBottom.value = nearBottom

    // 仅监听消息内容容器变化，避免加载条或“回到底部”按钮显隐触发误判
    const observeTarget = contentRef.value || containerRef.value
    observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0)
      scheduleUpdate(hasAddedNodes)
    })
    observer.observe(observeTarget, { childList: true, subtree: true, characterData: true })

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleUpdate(false)
      })
      resizeObserver.observe(observeTarget)
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

defineExpose<ConversationListInstance>({ scrollToBottom: () => scrollToBottom(false), getElement })
</script>
