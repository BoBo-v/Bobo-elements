export type CursorStyle = 'line' | 'block' | 'underline'

export interface StreamingTextProps {
  text?: string
  speed?: number
  interval?: number
  showCursor?: boolean
  cursorChar?: string
  cursorStyle?: CursorStyle
  paused?: boolean
  onComplete?: () => void
}

export interface StreamingTextEmits {
  (e: 'complete'): void
}

export interface StreamingTextInstance {
  reset: () => void
  finish: () => void
  pause: () => void
  resume: () => void
  isComplete: boolean | { readonly value: boolean }
}
