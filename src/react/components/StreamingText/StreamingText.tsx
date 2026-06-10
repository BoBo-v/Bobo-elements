import { useState, useEffect, useRef, useCallback, useImperativeHandle, forwardRef, memo } from 'react'
import type { StreamingTextProps } from '../../../core/components/streaming-text.types'
import { createStreamingState } from '../../../core/components/streaming-text.logic'
import '../../../components/StreamingText/style.css'

export interface StreamingTextRef {
  reset: () => void
  isComplete: boolean
}

const DEFAULT_CURSOR_CHARS: Record<string, string> = {
  line: '│',
  block: '█',
  underline: '_'
}

export const StreamingText = memo(forwardRef<StreamingTextRef, StreamingTextProps>(function StreamingText({
  text = '',
  speed = 1,
  interval = 50,
  showCursor = true,
  cursorChar = '',
  cursorStyle = 'line',
  onComplete,
}: StreamingTextProps, ref) {
  const effectiveCursorChar = cursorChar || DEFAULT_CURSOR_CHARS[cursorStyle]
  const stateRef = useRef(createStreamingState())
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const completedTextRef = useRef<string | null>(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const emitCompleteOnce = useCallback((completedText: string) => {
    if (!completedText || completedTextRef.current === completedText) return
    completedTextRef.current = completedText
    onCompleteRef.current?.()
  }, [])

  const stopInterval = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startInterval = useCallback(() => {
    stopInterval()
    timerRef.current = setInterval(() => {
      const state = stateRef.current
      state.tick(text.length, speed)
      setDisplayText(state.getDisplayText(text))
      if (state.isComplete(text)) {
        setIsDone(true)
        stopInterval()
        emitCompleteOnce(text)
      }
    }, interval)
  }, [text, speed, interval, stopInterval, emitCompleteOnce])

  useEffect(() => {
    const state = stateRef.current
    if (completedTextRef.current !== text) {
      completedTextRef.current = null
    }
    state.onTextChange(text)
    if (state.isComplete(text)) {
      setIsDone(true)
      setDisplayText(text)
      stopInterval()
      emitCompleteOnce(text)
    } else {
      setIsDone(false)
      setDisplayText(state.getDisplayText(text))
      startInterval()
    }
    return stopInterval
  }, [text, startInterval, stopInterval, emitCompleteOnce])

  const reset = useCallback(() => {
    stateRef.current.reset()
    completedTextRef.current = null
    setDisplayText('')
    setIsDone(false)
    if (text) {
      startInterval()
    }
  }, [text, startInterval])

  useImperativeHandle(ref, () => ({ reset, isComplete: isDone }), [reset, isDone])

  return (
    <span className="vk-streaming-text" data-testid="streaming-text" role="status" aria-live="polite">
      <span data-testid="streaming-text-content">{displayText}</span>
      {showCursor && (
        <span
          className={`vk-streaming-text__cursor${isDone ? ' vk-streaming-text__cursor--hidden' : ''}${cursorStyle === 'block' ? ' vk-streaming-text__cursor--block' : ''}${cursorStyle === 'underline' ? ' vk-streaming-text__cursor--underline' : ''}`}
          data-testid="streaming-text-cursor"
        >
          {effectiveCursorChar}
        </span>
      )}
    </span>
  )
}))
