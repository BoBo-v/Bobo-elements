import { useMemo, memo } from 'react'
import type { ChatMessageProps } from '../../../core/components/chat-message.react.types'
import { ThinkingIndicator } from '../ThinkingIndicator'
import Icon from '../Icon'
import '../../../components/ChatMessage/style.css'

const ROLE_ICONS: Record<string, string> = {
  user: 'user',
  assistant: 'robot',
  system: 'circle-info',
}

export const ChatMessage = memo(function ChatMessage({
  role,
  avatar,
  avatarSize = 'default',
  timestamp,
  status = 'sent',
  showAvatar = true,
  errorMessage = '发送失败',
  retryText = '重试',
  children,
  onRetry,
  onAvatarError,
}: ChatMessageProps) {
  const formattedTime = useMemo(() => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }, [timestamp])

  return (
    <div className={`vk-chat-message vk-chat-message--${role}`} data-testid="chat-message">
      {showAvatar && (
        <div className={`vk-chat-message__avatar vk-chat-message__avatar--${avatarSize}`} data-testid="chat-message-avatar">
          {avatar ? (
            <img src={avatar} alt={`${role} 头像`} onError={onAvatarError} />
          ) : (
            <Icon name={ROLE_ICONS[role] || 'user'} className="vk-chat-message__avatar-icon" />
          )}
        </div>
      )}
      <div className="vk-chat-message__body">
        <div className="vk-chat-message__bubble" data-testid="chat-message-bubble">
          {children}
          {status === 'streaming' && !children && <ThinkingIndicator />}
        </div>
        {timestamp && (
          <div className="vk-chat-message__timestamp" data-testid="chat-message-timestamp">
            {formattedTime}
          </div>
        )}
        {status === 'error' && (
          <div className="vk-chat-message__status vk-chat-message__status--error" data-testid="chat-message-error">
            <span>{errorMessage}</span>
            <button className="vk-chat-message__retry" data-testid="chat-message-retry" onClick={onRetry}>
              <Icon name="rotate-right" /> {retryText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
})
