import { useState, useRef, useEffect, useCallback, memo } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type {
  MessageActionsProps as CoreMessageActionsProps,
  FeedbackValue,
} from '../../../core/components/message-actions.types'
import { copyToClipboard } from '../../../core/components/code-block.logic'
import Icon from '../Icon'
import '../../../components/MessageActions/style.css'

export type { FeedbackValue }

export interface MessageActionsProps extends CoreMessageActionsProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  onCopy?: (content: string) => void
  onRegenerate?: () => void
  onEdit?: () => void
  onFeedback?: (value: FeedbackValue) => void
  onBranchChange?: (index: number) => void
}

export const MessageActions = memo(function MessageActions({
  content = '',
  copyable = true,
  regenerable = false,
  editable = false,
  feedbackable = true,
  feedback = null,
  branchIndex = 1,
  branchTotal = 0,
  copyText = '复制',
  copiedText = '已复制',
  regenerateText = '重新生成',
  editText = '编辑',
  className,
  style,
  children,
  onCopy,
  onRegenerate,
  onEdit,
  onFeedback,
  onBranchChange,
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopy = useCallback(async () => {
    try {
      if (content) {
        await copyToClipboard(content)
      }
      setCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
      onCopy?.(content)
    } catch {
      // 忽略剪贴板异常
    }
  }, [content, onCopy])

  const rootClass = ['vk-message-actions', className || ''].filter(Boolean).join(' ')

  return (
    <div className={rootClass} style={style} data-testid="message-actions">
      {branchTotal > 1 && (
        <div className="vk-message-actions__branches" data-testid="message-actions-branches">
          <button
            type="button"
            className="vk-message-actions__branch-btn"
            disabled={branchIndex <= 1}
            data-testid="message-actions-prev"
            aria-label="上一版本"
            onClick={() => onBranchChange?.(branchIndex - 1)}
          >
            &lt;
          </button>
          <span>{branchIndex} / {branchTotal}</span>
          <button
            type="button"
            className="vk-message-actions__branch-btn"
            disabled={branchIndex >= branchTotal}
            data-testid="message-actions-next"
            aria-label="下一版本"
            onClick={() => onBranchChange?.(branchIndex + 1)}
          >
            &gt;
          </button>
        </div>
      )}

      {copyable && (
        <button
          type="button"
          className="vk-message-actions__btn"
          data-testid="message-actions-copy"
          onClick={handleCopy}
        >
          <Icon name={copied ? 'check' : 'copy'} />
          <span>{copied ? copiedText : copyText}</span>
        </button>
      )}

      {regenerable && (
        <button
          type="button"
          className="vk-message-actions__btn"
          data-testid="message-actions-regenerate"
          onClick={onRegenerate}
        >
          <Icon name="rotate-right" />
          <span>{regenerateText}</span>
        </button>
      )}

      {editable && (
        <button
          type="button"
          className="vk-message-actions__btn"
          data-testid="message-actions-edit"
          onClick={onEdit}
        >
          <Icon name="pen" />
          <span>{editText}</span>
        </button>
      )}

      {feedbackable && (
        <>
          <button
            type="button"
            className={`vk-message-actions__btn${feedback === 'like' ? ' is-active' : ''}`}
            data-testid="message-actions-like"
            aria-label="点赞"
            onClick={() => onFeedback?.(feedback === 'like' ? null : 'like')}
          >
            <Icon name="thumbs-up" />
          </button>
          <button
            type="button"
            className={`vk-message-actions__btn is-dislike${feedback === 'dislike' ? ' is-active' : ''}`}
            data-testid="message-actions-dislike"
            aria-label="点踩"
            onClick={() => onFeedback?.(feedback === 'dislike' ? null : 'dislike')}
          >
            <Icon name="thumbs-down" />
          </button>
        </>
      )}

      {children}
    </div>
  )
})
