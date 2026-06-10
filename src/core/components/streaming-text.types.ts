export type CursorStyle = 'line' | 'block' | 'underline'

export interface StreamingTextProps {
  text?: string
  speed?: number
  interval?: number
  showCursor?: boolean
  cursorChar?: string
  cursorStyle?: CursorStyle
  onComplete?: () => void
}

export interface StreamingTextEmits {
  (e: 'complete'): void
}
