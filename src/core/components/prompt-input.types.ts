export type PromptInputSize = 'small' | 'default' | 'large'
export type PromptInputVariant = 'default' | 'filled'

export interface PromptInputProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  /** 流式响应期间是否同时禁用文本输入 */
  disableInputWhenStreaming?: boolean
  maxLength?: number
  rows?: number
  autoResize?: boolean
  maxRows?: number
  showCount?: boolean
  id?: string
  ariaLabel?: string
  ariaLabelledby?: string
  streaming?: boolean
  streamingText?: string
  stoppable?: boolean
  /** @deprecated Use `stoppable` instead */
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
  (e: 'paste-files', files: File[]): void
  (e: 'drop-files', files: File[]): void
}

export interface PromptInputInstance {
  focus: () => void
  blur: () => void
  clear: () => void
  getElement: () => HTMLTextAreaElement | null
  textareaRef: HTMLTextAreaElement | null | { value: HTMLTextAreaElement | null }
}
