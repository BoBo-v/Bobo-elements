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
  hintText?: string
  sendAriaLabel?: string
}

export interface PromptInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'submit', value: string): void
  (e: 'keydown', event: KeyboardEvent): void
}

export interface PromptInputInstance {
  focus: () => void
  blur: () => void
  clear: () => void
  textareaRef: HTMLTextAreaElement | null | { value: HTMLTextAreaElement | null }
}
