<template>
  <div
    ref="containerRef"
    class="vk-conversation-list"
    :style="{ maxHeight }"
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
import { ref, watch, onMounted, onUnmounted, useSlots } from 'vue'
import type { ConversationListProps, ConversationListEmits } from '../../core/components/conversation-list.types'
import '../../components/ConversationList/style.css'

defineOptions({ name: 'VkConversationList' })

withDefaults(defineProps<ConversationListProps>(), {
  autoScroll: true,
  loadingMore: false,
  maxHeight: '100%',
  emptyText: '暂无对话',
  loadingText: '加载中...'
})

const emits = defineEmits<ConversationListEmits>()
const slots = useSlots()
const containerRef = ref<HTMLElement | null>(null)
let observer: MutationObserver | null = null

function scrollToBottom() {
  const el = containerRef.value
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}

function handleScroll() {
  const el = containerRef.value
  if (!el) return
  emits('scroll', el.scrollTop)
  if (el.scrollTop === 0) {
    emits('load-more')
  }
}

onMounted(() => {
  if (containerRef.value) {
    observer = new MutationObserver(() => {
      scrollToBottom()
    })
    observer.observe(containerRef.value, { childList: true, subtree: true })
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
