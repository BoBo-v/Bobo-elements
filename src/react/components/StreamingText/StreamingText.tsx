import { useState, useEffect, useRef, useCallback, useImperativeHandle, forwardRef, memo } from 'react'
import type { StreamingTextProps } from '../../../core/components/streaming-text.types'
import { createStreamingState } from '../../../core/components/streaming-text.logic'
import '../../../components/StreamingText/style.css'

export interface StreamingTextRef {
  reset: () => void
  isComplete: boolean
}

export const StreamingText = memo(forwardRef<StreamingTextRef, StreamingTextProps>(function StreamingText({
  text = '',
  speed = 1,
  interval = 50,
  showCursor = true,
  cursorChar = '│',
}: StreamingTextProps, ref) {
  const stateRef = useRef(createStreamingState())
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

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
      }
    }, interval)
  }, [text, speed, interval, stopInterval])

  useEffect(() => {
    const state = stateRef.current
    state.onTextChange(text)
    if (state.isComplete(text)) {
      setIsDone(true)
      setDisplayText(text)
      stopInterval()
    } else {
      setIsDone(false)
      setDisplayText(state.getDisplayText(text))
      startInterval()
    }
    return stopInterval
  }, [text, startInterval, stopInterval])

  const reset = useCallback(() => {
    stateRef.current.reset()
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
          className={`vk-streaming-text__cursor${isDone ? ' vk-streaming-text__cursor--hidden' : ''}`}
          data-testid="streaming-text-cursor"
        >
          {cursorChar}
        </span>
      )}
    </span>
  )
}))
