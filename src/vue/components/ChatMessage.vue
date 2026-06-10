<template>
  <div
    class="vk-chat-message"
    :class="[`vk-chat-message--${role}`]"
    data-testid="chat-message"
  >
    <div
      v-if="showAvatar"
      class="vk-chat-message__avatar"
      :class="[`vk-chat-message__avatar--${avatarSize}`]"
      data-testid="chat-message-avatar"
    >
      <img v-if="avatar" :src="avatar" :alt="`${role} 头像`" @error="onAvatarError" />
      <Icon v-else :icon="defaultIcon" class="vk-chat-message__avatar-icon" />
    </div>
    <div class="vk-chat-message__body">
      <div class="vk-chat-message__bubble" data-testid="chat-message-bubble">
        <slot />
        <slot v-if="status === 'streaming' && !$slots.default" name="loading">
          <ThinkingIndicator />
        </slot>
      </div>
      <div v-if="copyable && content" class="vk-chat-message__actions">
        <button
          class="vk-chat-message__copy-btn"
          data-testid="chat-message-copy-btn"
          :aria-label="copied ? copiedText : copyText"
          @click="handleCopy"
        >
          {{ copied ? copiedText : copyText }}
        </button>
      </div>
      <div v-if="timestamp" class="vk-chat-message__timestamp" data-testid="chat-message-timestamp">
        {{ formattedTime }}
      </div>
      <div v-if="status === 'error'" class="vk-chat-message__status vk-chat-message__status--error" data-testid="chat-message-error">
        <span>{{ errorMessage }}</span>
        <button class="vk-chat-message__retry" data-testid="chat-message-retry" @click="$emit('retry')">
          <Icon icon="rotate-right" /> {{ retryText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import type { ChatMessageProps, ChatMessageEmits } from '../../core/components/chat-message.types'
import ThinkingIndicator from './ThinkingIndicator.vue'
import Icon from './Icon.vue'
import '../../components/ChatMessage/style.css'

defineOptions({ name: 'VkChatMessage' })

const props = withDefaults(defineProps<ChatMessageProps>(), {
  status: 'sent',
  showAvatar: true,
  avatarSize: 'default',
  errorMessage: '发送失败',
  retryText: '重试',
  copyable: false,
  copyText: '复制',
  copiedText: '已复制'
})

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

async function handleCopy() {
  if (!props.content) return
  try {
    await navigator.clipboard.writeText(props.content)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 2000)
  } catch {}
}

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer)
})

const emit = defineEmits<ChatMessageEmits>()

function onAvatarError(e: Event) {
  emit('avatar-error', e)
}

const defaultIcon = computed(() => {
  switch (props.role) {
    case 'user': return 'user'
    case 'assistant': return 'robot'
    case 'system': return 'circle-info'
    default: return 'user'
  }
})

const formattedTime = computed(() => {
  if (!props.timestamp) return ''
  const date = new Date(props.timestamp)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
})
</script>
