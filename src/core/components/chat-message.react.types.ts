import type { ReactNode, SyntheticEvent, CSSProperties } from 'react'
import type { ChatMessageAvatarPlacement, ChatMessageRole, ChatMessageStatus, ChatMessageVariant } from './chat-message.types'

export type { ChatMessageRole, ChatMessageStatus, ChatMessageVariant, ChatMessageAvatarPlacement }

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
  className?: string
  style?: CSSProperties
  children?: ReactNode
  header?: ReactNode
  actions?: ReactNode
  loading?: ReactNode
  onRetry?: () => void
  onAvatarError?: (event: SyntheticEvent<HTMLImageElement>) => void
}
