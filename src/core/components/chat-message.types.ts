export type ChatMessageRole = 'user' | 'assistant' | 'system'
export type ChatMessageStatus = 'sending' | 'sent' | 'error' | 'streaming'
export type ChatMessageVariant = 'bubble' | 'flat'
export type ChatMessageAvatarPlacement = 'top' | 'center'

export interface ChatMessageProps {
  role: ChatMessageRole
  avatar?: string
  avatarSize?: 'small' | 'default' | 'large'
  avatarPlacement?: ChatMessageAvatarPlacement
  variant?: ChatMessageVariant
  senderName?: string
  timestamp?: string | number | Date
  locale?: string
  formatTimestamp?: (date: Date) => string
  status?: ChatMessageStatus
  showAvatar?: boolean
  errorMessage?: string
  retryText?: string
  copyable?: boolean
  copyText?: string
  copiedText?: string
  content?: string
  copyContent?: string
  contentVisibility?: 'auto' | 'visible'
}

export interface ChatMessageEmits {
  (e: 'retry'): void
  (e: 'avatar-error', event: Event): void
}
