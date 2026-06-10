import { useMemo, useState, useCallback, useRef, useEffect, memo } from 'react'
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
  copyable = false,
  copyText = '复制',
  copiedText = '已复制',
  content,
  children,
  loading,
  onRetry,
  onAvatarError,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  const handleCopy = useCallback(async () => {
    if (!content) return
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {}
  }, [content])
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
          {status === 'streaming' && !children && (loading || <ThinkingIndicator />)}
        </div>
        {copyable && content && (
          <div className="vk-chat-message__actions">
            <button
              className="vk-chat-message__copy-btn"
              data-testid="chat-message-copy-btn"
              aria-label={copied ? copiedText : copyText}
              onClick={handleCopy}
            >
              {copied ? copiedText : copyText}
            </button>
          </div>
        )}
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
