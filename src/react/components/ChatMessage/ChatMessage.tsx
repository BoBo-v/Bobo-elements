import { useMemo, useState, useCallback, useRef, useEffect, memo } from 'react'
import type { ChatMessageProps } from '../../../core/components/chat-message.react.types'
import { formatTimestamp as formatChatTimestamp } from '../../../core/components/ai-format'
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
  avatarPlacement = 'top',
  variant = 'bubble',
  senderName,
  timestamp,
  locale = 'zh-CN',
  formatTimestamp,
  status = 'sent',
  showAvatar = true,
  errorMessage = '发送失败',
  retryText = '重试',
  copyable = false,
  copyText = '复制',
  copiedText = '已复制',
  contentVisibility = 'auto',
  content,
  copyContent,
  className,
  style,
  children,
  header,
  actions,
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
    const text = copyContent || content || ''
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // 忽略剪贴板权限异常
    }
  }, [content, copyContent])

  const effectiveCopyContent = copyContent || content || ''
  const formattedTime = useMemo(
    () => formatChatTimestamp(timestamp, locale, formatTimestamp),
    [timestamp, locale, formatTimestamp]
  )

  const showActionsBar = status !== 'streaming' && Boolean(actions || (copyable && effectiveCopyContent))

  const rootClass = [
    'vk-chat-message',
    `vk-chat-message--${role}`,
    variant === 'flat' ? 'vk-chat-message--flat' : '',
    avatarPlacement === 'center' ? 'vk-chat-message--avatar-center' : '',
    contentVisibility === 'visible' ? 'vk-chat-message--visible' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClass} style={style} data-testid="chat-message">
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
        {(header || senderName) && (
          <div className="vk-chat-message__header" data-testid="chat-message-header">
            {header || <span className="vk-chat-message__sender">{senderName}</span>}
          </div>
        )}
        <div className="vk-chat-message__bubble" data-testid="chat-message-bubble">
          {children}
          {status === 'streaming' && !children && (loading || <ThinkingIndicator />)}
        </div>
        {showActionsBar && (
          <div className="vk-chat-message__actions">
            {copyable && effectiveCopyContent && (
              <button
                type="button"
                className="vk-chat-message__copy-btn"
                data-testid="chat-message-copy-btn"
                aria-label={copied ? copiedText : copyText}
                onClick={handleCopy}
              >
                {copied ? copiedText : copyText}
              </button>
            )}
            {actions}
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
            <button type="button" className="vk-chat-message__retry" data-testid="chat-message-retry" onClick={onRetry}>
              <Icon name="rotate-right" /> {retryText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
})
