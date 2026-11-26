import { memo } from 'react'
import type { CSSProperties } from 'react'
import type {
  AttachmentProps as CoreAttachmentProps,
  AttachmentItem,
  AttachmentStatus,
  AttachmentListLayout,
} from '../../../core/components/attachment.types'
import { formatFileSize } from '../../../core/components/ai-format'
import { isImageAttachment, getAttachmentIcon } from '../../../core/components/attachment.logic'
import Icon from '../Icon'
import '../../../components/Attachment/style.css'

export type { AttachmentItem, AttachmentStatus, AttachmentListLayout }

export interface AttachmentProps extends CoreAttachmentProps {
  className?: string
  style?: CSSProperties
  onRemove?: (item: AttachmentItem) => void
  onClick?: (item: AttachmentItem) => void
  onRetry?: (item: AttachmentItem) => void
}

export const Attachment = memo(function Attachment({
  items = [],
  layout = 'horizontal',
  removable = true,
  clickable = false,
  removeAriaLabel = '移除',
  retryText = '重试',
  className,
  style,
  onRemove,
  onClick,
  onRetry,
}: AttachmentProps) {
  const rootClass = [
    'vk-attachment-list',
    `vk-attachment-list--${layout}`,
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClass} style={style} data-testid="attachment-list">
      {items.map((item) => {
        const cardClass = [
          'vk-attachment-card',
          item.status ? `vk-attachment-card--${item.status}` : '',
          clickable ? 'vk-attachment-card--clickable' : '',
        ].filter(Boolean).join(' ')

        return (
          <div
            key={item.id}
            className={cardClass}
            data-testid="attachment-card"
            onClick={() => clickable && onClick?.(item)}
          >
            <div className="vk-attachment-card__thumb">
              {isImageAttachment(item) ? (
                <img src={item.url} alt={item.name} />
              ) : (
                <Icon name={getAttachmentIcon(item)} />
              )}
            </div>
            <div className="vk-attachment-card__info">
              <div className="vk-attachment-card__name" title={item.name}>
                {item.name}
              </div>
              <div className="vk-attachment-card__meta">
                {item.status === 'error' ? (
                  <span className="vk-attachment-card__error-text">
                    {item.errorMessage || '上传失败'}
                  </span>
                ) : (
                  item.size !== undefined && <span>{formatFileSize(item.size)}</span>
                )}
                {item.status === 'error' && (
                  <button
                    type="button"
                    className="vk-attachment-card__retry"
                    data-testid="attachment-retry-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRetry?.(item)
                    }}
                  >
                    {retryText}
                  </button>
                )}
              </div>
              {item.status === 'uploading' && (
                <div className="vk-attachment-card__progress" data-testid="attachment-progress">
                  <div
                    className="vk-attachment-card__progress-bar"
                    style={{ width: `${Math.min(100, Math.max(0, item.progress ?? 0))}%` }}
                  />
                </div>
              )}
            </div>
            {removable && (
              <button
                type="button"
                className="vk-attachment-card__remove"
                data-testid="attachment-remove-btn"
                aria-label={`${removeAriaLabel} ${item.name}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove?.(item)
                }}
              >
                <Icon name="xmark" />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
})
