<template>
  <div class="vk-message-actions" data-testid="message-actions">
    <div v-if="branchTotal && branchTotal > 1" class="vk-message-actions__branches" data-testid="message-actions-branches">
      <button
        type="button"
        class="vk-message-actions__branch-btn"
        :disabled="branchIndex <= 1"
        data-testid="message-actions-prev"
        aria-label="上一版本"
        @click="$emit('branch-change', branchIndex - 1)"
      >
        &lt;
      </button>
      <span>{{ branchIndex }} / {{ branchTotal }}</span>
      <button
        type="button"
        class="vk-message-actions__branch-btn"
        :disabled="branchIndex >= branchTotal"
        data-testid="message-actions-next"
        aria-label="下一版本"
        @click="$emit('branch-change', branchIndex + 1)"
      >
        &gt;
      </button>
    </div>

    <button
      v-if="copyable"
      type="button"
      class="vk-message-actions__btn"
      data-testid="message-actions-copy"
      @click="handleCopy"
    >
      <Icon :icon="copied ? 'check' : 'copy'" />
      <span>{{ copied ? copiedText : copyText }}</span>
    </button>

    <button
      v-if="regenerable"
      type="button"
      class="vk-message-actions__btn"
      data-testid="message-actions-regenerate"
      @click="$emit('regenerate')"
    >
      <Icon icon="rotate-right" />
      <span>{{ regenerateText }}</span>
    </button>

    <button
      v-if="editable"
      type="button"
      class="vk-message-actions__btn"
      data-testid="message-actions-edit"
      @click="$emit('edit')"
    >
      <Icon icon="pen" />
      <span>{{ editText }}</span>
    </button>

    <template v-if="feedbackable">
      <button
        type="button"
        class="vk-message-actions__btn"
        :class="{ 'is-active': feedback === 'like' }"
        data-testid="message-actions-like"
        aria-label="点赞"
        @click="toggleFeedback('like')"
      >
        <Icon icon="thumbs-up" />
      </button>
      <button
        type="button"
        class="vk-message-actions__btn is-dislike"
        :class="{ 'is-active': feedback === 'dislike' }"
        data-testid="message-actions-dislike"
        aria-label="点踩"
        @click="toggleFeedback('dislike')"
      >
        <Icon icon="thumbs-down" />
      </button>
    </template>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import type { MessageActionsProps, MessageActionsEmits, FeedbackValue } from '../../core/components/message-actions.types'
import { copyToClipboard } from '../../core/components/code-block.logic'
import Icon from './Icon.vue'
import '../../components/MessageActions/style.css'

defineOptions({ name: 'VkMessageActions' })

const props = withDefaults(defineProps<MessageActionsProps>(), {
  content: '',
  copyable: true,
  regenerable: false,
  editable: false,
  feedbackable: true,
  feedback: null,
  branchIndex: 1,
  branchTotal: 0,
  copyText: '复制',
  copiedText: '已复制',
  regenerateText: '重新生成',
  editText: '编辑'
})

const emits = defineEmits<MessageActionsEmits>()
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

async function handleCopy() {
  try {
    if (props.content) {
      await copyToClipboard(props.content)
    }
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 2000)
    emits('copy', props.content)
  } catch {
    // 忽略剪贴板异常
  }
}

function toggleFeedback(target: 'like' | 'dislike') {
  const next: FeedbackValue = props.feedback === target ? null : target
  emits('feedback', next)
}

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer)
})
</script>
