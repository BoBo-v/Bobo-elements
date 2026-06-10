export type PromptInputSize = 'small' | 'default' | 'large'
export type PromptInputVariant = 'default' | 'filled'

export interface PromptInputProps {
  modelValue?: string
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
}

export interface PromptInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'submit', value: string): void
  (e: 'stop'): void
  (e: 'keydown', event: KeyboardEvent): void
}

export interface PromptInputInstance {
  focus: () => void
  blur: () => void
  clear: () => void
  textareaRef: HTMLTextAreaElement | null | { value: HTMLTextAreaElement | null }
}
