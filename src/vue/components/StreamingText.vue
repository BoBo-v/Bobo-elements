<template>
  <span class="vk-streaming-text" data-testid="streaming-text" role="status" aria-live="polite">
    <span data-testid="streaming-text-content">{{ displayText }}</span>
    <span
      v-if="showCursor"
      class="vk-streaming-text__cursor"
      :class="[
        isDone ? 'vk-streaming-text__cursor--hidden' : '',
        cursorStyle === 'block' ? 'vk-streaming-text__cursor--block' : '',
        cursorStyle === 'underline' ? 'vk-streaming-text__cursor--underline' : ''
      ]"
      data-testid="streaming-text-cursor"
    >{{ effectiveCursorChar }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import type { StreamingTextProps, StreamingTextEmits, StreamingTextInstance } from '../../core/components/streaming-text.types'
import { createStreamingState } from '../../core/components/streaming-text.logic'
import '../../components/StreamingText/style.css'

defineOptions({ name: 'VkStreamingText' })

const props = withDefaults(defineProps<StreamingTextProps>(), {
  text: '',
  speed: 1,
  interval: 50,
  showCursor: true,
  cursorChar: '',
  cursorStyle: 'line',
  paused: false
})

const DEFAULT_CURSOR_CHARS: Record<string, string> = {
  line: '│',
  block: '█',
  underline: '_'
}

const effectiveCursorChar = computed(() =>
  props.cursorChar || DEFAULT_CURSOR_CHARS[props.cursorStyle]
)

const emits = defineEmits<StreamingTextEmits>()

const state = createStreamingState()
const displayText = ref('')
const isDone = ref(false)
let timer: ReturnType<typeof setInterval> | null = null
let completedText: string | null = null

function emitCompleteOnce(text: string) {
  if (!text || completedText === text) return
  completedText = text
  emits('complete')
  props.onComplete?.()
}

function startInterval() {
  stopInterval()
  if (props.paused || !props.text) return
  timer = setInterval(() => {
    state.tick(props.text.length, props.speed)
    displayText.value = state.getDisplayText(props.text)
    isDone.value = state.isComplete(props.text)
    if (isDone.value) {
      stopInterval()
      emitCompleteOnce(props.text)
    }
  }, Math.max(16, props.interval))
}

function stopInterval() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

watch(() => props.text, (newText) => {
  if (completedText !== newText) {
    completedText = null
  }
  state.onTextChange(newText)
  isDone.value = state.isComplete(newText)
  if (!isDone.value) {
    startInterval()
  } else {
    stopInterval()
    emitCompleteOnce(newText)
  }
  displayText.value = state.getDisplayText(newText)
})

watch(() => [props.paused, props.speed, props.interval] as const, () => {
  if (isDone.value || !props.text) return
  if (props.paused) {
    stopInterval()
  } else {
    startInterval()
  }
})

onMounted(() => {
  // 挂载时同步初始化字素簇缓存，避免首次 tick 才触发分段
  state.onTextChange(props.text)
  isDone.value = state.isComplete(props.text)
  displayText.value = state.getDisplayText(props.text)
  if (props.text && !isDone.value) {
    startInterval()
  } else if (props.text && isDone.value) {
    emitCompleteOnce(props.text)
  }
})

onUnmounted(() => {
  stopInterval()
})

function reset() {
  state.reset()
  completedText = null
  displayText.value = ''
  isDone.value = false
  if (props.text) {
    state.onTextChange(props.text)
    startInterval()
  }
}

function finish() {
  stopInterval()
  state.finish(props.text.length)
  displayText.value = props.text
  isDone.value = true
  emitCompleteOnce(props.text)
}

function pause() {
  stopInterval()
}

function resume() {
  if (!isDone.value) startInterval()
}

defineExpose<StreamingTextInstance>({
  reset,
  finish,
  pause,
  resume,
  isComplete: computed(() => isDone.value)
})
</script>
