<template>
  <div
    class="vk-prompt-input"
    :class="{
      'is-disabled': disabled,
      'is-streaming': streaming
    }"
    data-testid="prompt-input"
  >
    <textarea
      ref="textareaRef"
      class="vk-prompt-input__textarea"
      :value="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
      :rows="rows"
      :aria-label="placeholder"
      data-testid="prompt-input-textarea"
      @input="handleInput"
      @keydown="handleKeydown"
    />
    <div class="vk-prompt-input__footer">
      <div class="vk-prompt-input__actions">
        <span v-if="streaming" class="vk-prompt-input__streaming-badge">
          {{ streamingText }}
        </span>
        <span v-if="showCount && maxLength" class="vk-prompt-input__count" :class="{ 'is-exceeded': innerValue.length > maxLength }">
          {{ innerValue.length }} / {{ maxLength }}
        </span>
      </div>
      <div class="vk-prompt-input__actions">
        <span class="vk-prompt-input__hint">{{ hintText }}</span>
        <button
          class="vk-prompt-input__send-btn"
          :disabled="!innerValue.trim() || disabled || streaming"
          data-testid="prompt-input-send-btn"
          :aria-label="sendAriaLabel"
          @click="handleSubmit"
        >
          <Icon icon="arrow-up" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { PromptInputProps, PromptInputEmits, PromptInputInstance } from '../../core/components/prompt-input.types'
import Icon from './Icon.vue'
import '../../components/PromptInput/style.css'

defineOptions({ name: 'VkPromptInput' })

const props = withDefaults(defineProps<PromptInputProps>(), {
  modelValue: '',
  placeholder: '输入消息...',
  disabled: false,
  rows: 1,
  autoResize: true,
  maxRows: 6,
  showCount: false,
  streaming: false,
  streamingText: 'AI 正在回复...',
  hintText: 'Enter 发送 / Shift+Enter 换行',
  sendAriaLabel: '发送'
})

const emits = defineEmits<PromptInputEmits>()
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const innerValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  innerValue.value = val
})

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  innerValue.value = target.value
  emits('update:modelValue', target.value)
  if (props.autoResize) {
    autoResize()
  }
}

function handleKeydown(e: KeyboardEvent) {
  emits('keydown', e)
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}

function handleSubmit() {
  const trimmed = innerValue.value.trim()
  if (trimmed && !props.disabled && !props.streaming) {
    emits('submit', trimmed)
  }
}

function autoResize() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 21
  const maxHeight = lineHeight * props.maxRows
  el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px'
}

function focus() { textareaRef.value?.focus() }
function blur() { textareaRef.value?.blur() }
function clear() {
  innerValue.value = ''
  emits('update:modelValue', '')
  if (props.autoResize && textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }
}

onMounted(() => {
  if (props.autoResize) autoResize()
})

defineExpose<PromptInputInstance>({ focus, blur, clear, textareaRef })
</script>
