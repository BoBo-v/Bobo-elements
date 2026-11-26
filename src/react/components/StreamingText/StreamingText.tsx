import { useState, useEffect, useRef, useCallback, useImperativeHandle, forwardRef, memo } from 'react'
import type { CSSProperties } from 'react'
import type { StreamingTextProps as CoreStreamingTextProps, CursorStyle } from '../../../core/components/streaming-text.types'
import { createStreamingState } from '../../../core/components/streaming-text.logic'
import '../../../components/StreamingText/style.css'

export type { CursorStyle }

export interface StreamingTextProps extends CoreStreamingTextProps {
  className?: string
  style?: CSSProperties
}

export interface StreamingTextRef {
  reset: () => void
  finish: () => void
  pause: () => void
  resume: () => void
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
  paused = false,
  className,
  style,
  onComplete,
}: StreamingTextProps, ref) {
  const effectiveCursorChar = cursorChar || DEFAULT_CURSOR_CHARS[cursorStyle]
  const stateRef = useRef(createStreamingState())
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const completedTextRef = useRef<string | null>(null)
  const onCompleteRef = useRef(onComplete)
  const configRef = useRef({ text, speed, interval, paused })
  configRef.current = { text, speed, interval, paused }

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
    const { text: curText, interval: curInterval, paused: curPaused } = configRef.current
    if (curPaused || !curText) return
    timerRef.current = setInterval(() => {
      const latestText = configRef.current.text
      const latestSpeed = configRef.current.speed
      const state = stateRef.current
      state.tick(latestText.length, latestSpeed)
      setDisplayText(state.getDisplayText(latestText))
      if (state.isComplete(latestText)) {
        setIsDone(true)
        stopInterval()
        emitCompleteOnce(latestText)
      }
    }, Math.max(16, curInterval))
  }, [stopInterval, emitCompleteOnce])

  // 仅当文本变化时同步字素簇状态，避免因 paused/speed 变化导致重复重算
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
      if (!configRef.current.paused) {
        startInterval()
      }
    }
    return stopInterval
  }, [text, startInterval, stopInterval, emitCompleteOnce])

  // 单独响应暂停、速度或间隔变化
  useEffect(() => {
    if (paused) {
      stopInterval()
    } else if (!isDone && text) {
      startInterval()
    }
  }, [paused, speed, interval, isDone, text, startInterval, stopInterval])

  const reset = useCallback(() => {
    stateRef.current.reset()
    completedTextRef.current = null
    setDisplayText('')
    setIsDone(false)
    if (configRef.current.text) {
      stateRef.current.onTextChange(configRef.current.text)
      startInterval()
    }
  }, [startInterval])

  const finish = useCallback(() => {
    const curText = configRef.current.text
    stopInterval()
    stateRef.current.finish(curText.length)
    setDisplayText(curText)
    setIsDone(true)
    emitCompleteOnce(curText)
  }, [stopInterval, emitCompleteOnce])

  const pause = useCallback(() => {
    stopInterval()
  }, [stopInterval])

  const resume = useCallback(() => {
    if (!stateRef.current.isComplete(configRef.current.text)) {
      startInterval()
    }
  }, [startInterval])

  useImperativeHandle(ref, () => ({ reset, finish, pause, resume, isComplete: isDone }), [reset, finish, pause, resume, isDone])

  const rootClass = ['vk-streaming-text', className || ''].filter(Boolean).join(' ')

  return (
    <span className={rootClass} style={style} data-testid="streaming-text" role="status" aria-live="polite">
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
