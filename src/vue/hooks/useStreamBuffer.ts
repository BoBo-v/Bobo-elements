import { ref, onUnmounted } from 'vue'
import { createStreamingState } from '../../core/components/streaming-text.logic'

export interface UseStreamBufferOptions {
  /** 每帧吐出的字素簇数量 */
  speed?: number
  /** 定时器间隔（毫秒，最小 16ms） */
  interval?: number
}

/**
 * 平滑缓冲 SSE / 流式 chunk 吐字的 Vue Composable，避免后端突发块到达导致界面卡顿跳跃
 */
export function useStreamBuffer(options: UseStreamBufferOptions = {}) {
  const speed = options.speed ?? 2
  const interval = Math.max(16, options.interval ?? 24)

  const displayText = ref('')
  const targetText = ref('')
  const isStreaming = ref(false)
  const state = createStreamingState()
  let timer: ReturnType<typeof setInterval> | null = null

  function stopTimer() {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  function startTimer() {
    if (timer !== null) return
    isStreaming.value = true
    timer = setInterval(() => {
      state.tick(targetText.value.length, speed)
      displayText.value = state.getDisplayText(targetText.value)
      if (state.isComplete(targetText.value)) {
        stopTimer()
        isStreaming.value = false
      }
    }, interval)
  }

  function push(chunk: string) {
    if (!chunk) return
    targetText.value += chunk
    state.onTextChange(targetText.value)
    startTimer()
  }

  function setTarget(fullText: string) {
    targetText.value = fullText
    state.onTextChange(fullText)
    if (!state.isComplete(fullText)) {
      startTimer()
    } else {
      displayText.value = fullText
      stopTimer()
      isStreaming.value = false
    }
  }

  function finish() {
    stopTimer()
    state.finish(targetText.value.length)
    displayText.value = targetText.value
    isStreaming.value = false
  }

  function reset() {
    stopTimer()
    state.reset()
    targetText.value = ''
    displayText.value = ''
    isStreaming.value = false
  }

  onUnmounted(stopTimer)

  return {
    displayText,
    targetText,
    isStreaming,
    push,
    setTarget,
    finish,
    reset
  }
}
