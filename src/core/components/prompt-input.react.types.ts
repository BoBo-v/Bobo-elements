import type { ReactNode, KeyboardEvent } from 'react'

export type PromptInputSize = 'small' | 'default' | 'large'
export type PromptInputVariant = 'default' | 'filled'

export interface PromptInputProps {
  value?: string
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  rows?: number
  autoResize?: boolean
  maxRows?: number
  showCount?: boolean
  streaming?: boolean
  streamingText?: string
  stopable?: boolean
  stopText?: string
  stopAriaLabel?: string
  hintText?: string
  sendAriaLabel?: string
  size?: PromptInputSize
  variant?: PromptInputVariant
  clearable?: boolean
  clearAriaLabel?: string
  children?: ReactNode
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onStop?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
}

export interface PromptInputRef {
  focus: () => void
  blur: () => void
  clear: () => void
  textareaRef: HTMLTextAreaElement | null
}
