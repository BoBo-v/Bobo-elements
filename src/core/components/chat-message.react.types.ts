import type { ReactNode, SyntheticEvent } from 'react'

export type ChatMessageRole = 'user' | 'assistant' | 'system'
export type ChatMessageStatus = 'sending' | 'sent' | 'error' | 'streaming'

export interface ChatMessageProps {
  role: ChatMessageRole
  avatar?: string
  avatarSize?: 'small' | 'default' | 'large'
  timestamp?: string | number | Date
  status?: ChatMessageStatus
  showAvatar?: boolean
  errorMessage?: string
  retryText?: string
  copyable?: boolean
  copyText?: string
  copiedText?: string
  content?: string
  copyContent?: string
  children?: ReactNode
  loading?: ReactNode
  onRetry?: () => void
  onAvatarError?: (event: SyntheticEvent<HTMLImageElement>) => void
}
