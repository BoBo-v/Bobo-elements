import { useState, useRef, useCallback, useEffect } from 'react'
import { createStreamingState } from '../../core/components/streaming-text.logic'

export interface UseStreamBufferOptions {
  /** 每帧吐出的字素簇数量 */
  speed?: number
  /** 定时器间隔（毫秒，最小 16ms） */
  interval?: number
}

/**
 * 平滑缓冲 SSE / 流式 chunk 吐字的 React Hook，避免突发 chunk 到达导致的视觉跳跃
 */
export function useStreamBuffer(options: UseStreamBufferOptions = {}) {
  const speed = options.speed ?? 2
  const interval = Math.max(16, options.interval ?? 24)

  const [displayText, setDisplayText] = useState('')
  const [targetText, setTargetText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const stateRef = useRef(createStreamingState())
  const targetRef = useRef('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    if (timerRef.current !== null) return
    setIsStreaming(true)
    timerRef.current = setInterval(() => {
      const target = targetRef.current
      stateRef.current.tick(target.length, speed)
      setDisplayText(stateRef.current.getDisplayText(target))
      if (stateRef.current.isComplete(target)) {
        stopTimer()
        setIsStreaming(false)
      }
    }, interval)
  }, [speed, interval, stopTimer])

  const push = useCallback((chunk: string) => {
    if (!chunk) return
    const next = targetRef.current + chunk
    targetRef.current = next
    setTargetText(next)
    stateRef.current.onTextChange(next)
    startTimer()
  }, [startTimer])

  const setTarget = useCallback((fullText: string) => {
    targetRef.current = fullText
    setTargetText(fullText)
    stateRef.current.onTextChange(fullText)
    if (!stateRef.current.isComplete(fullText)) {
      startTimer()
    } else {
      setDisplayText(fullText)
      stopTimer()
      setIsStreaming(false)
    }
  }, [startTimer, stopTimer])

  const finish = useCallback(() => {
    stopTimer()
    const target = targetRef.current
    stateRef.current.finish(target.length)
    setDisplayText(target)
    setIsStreaming(false)
  }, [stopTimer])

  const reset = useCallback(() => {
    stopTimer()
    stateRef.current.reset()
    targetRef.current = ''
    setTargetText('')
    setDisplayText('')
    setIsStreaming(false)
  }, [stopTimer])

  useEffect(() => stopTimer, [stopTimer])

  return {
    displayText,
    targetText,
    isStreaming,
    push,
    setTarget,
    finish,
    reset,
  }
}
