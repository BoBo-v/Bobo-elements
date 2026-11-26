import type { ReactNode, KeyboardEvent, CSSProperties } from 'react'
import type { PromptInputSize, PromptInputVariant } from './prompt-input.types'

export type { PromptInputSize, PromptInputVariant }

export interface PromptInputProps {
  value?: string
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
  className?: string
  style?: CSSProperties
  /** 顶部附件/上下文预览区域 */
  header?: ReactNode
  /** 底部左侧工具栏区域 */
  toolbar?: ReactNode
  /** 底部右侧自定义操作区（传 actions 时替换发送/停止按钮；children 保留向后兼容） */
  actions?: ReactNode
  children?: ReactNode
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onStop?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  onPasteFiles?: (files: File[]) => void
  onDropFiles?: (files: File[]) => void
}

export interface PromptInputRef {
  focus: () => void
  blur: () => void
  clear: () => void
  getElement: () => HTMLTextAreaElement | null
  textareaRef: HTMLTextAreaElement | null
}
