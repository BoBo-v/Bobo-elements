import { useState, useEffect, useMemo, memo } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type {
  ToolCallProps as CoreToolCallProps,
  ToolCallStatus,
} from '../../../core/components/tool-call.types'
import { formatDuration } from '../../../core/components/ai-format'
import { formatToolPayload, TOOL_STATUS_LABELS } from '../../../core/components/tool-call.logic'
import Icon from '../Icon'
import '../../../components/ToolCall/style.css'

export type { ToolCallStatus }

export interface ToolCallProps extends CoreToolCallProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  actions?: ReactNode
  onExpandedChange?: (expanded: boolean) => void
  onApprove?: () => void
  onReject?: () => void
}

const STATUS_ICONS: Record<ToolCallStatus, string> = {
  pending: 'clock',
  running: 'spinner',
  success: 'circle-check',
  error: 'circle-xmark',
  'awaiting-approval': 'triangle-exclamation',
}

export const ToolCall = memo(function ToolCall({
  title,
  toolName,
  status = 'pending',
  duration,
  expanded,
  defaultExpanded = false,
  args,
  result,
  errorMessage,
  approveText = '允许执行',
  rejectText = '拒绝',
  argsLabel = '输入参数',
  resultLabel = '执行结果',
  className,
  style,
  children,
  actions,
  onExpandedChange,
  onApprove,
  onReject,
}: ToolCallProps) {
  const [innerExpanded, setInnerExpanded] = useState(expanded ?? defaultExpanded)

  useEffect(() => {
    if (expanded !== undefined) {
      setInnerExpanded(expanded)
    }
  }, [expanded])

  const isExpanded = expanded ?? innerExpanded
  const formattedArgs = useMemo(() => formatToolPayload(args), [args])
  const formattedResult = useMemo(() => formatToolPayload(result), [result])
  const hasBody = Boolean(children || formattedArgs || formattedResult || errorMessage)

  const toggleExpand = () => {
    const next = !isExpanded
    setInnerExpanded(next)
    onExpandedChange?.(next)
  }

  const rootClass = [
    'vk-tool-call',
    `vk-tool-call--${status}`,
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClass} style={style} data-testid="tool-call">
      <button
        type="button"
        className="vk-tool-call__header"
        data-testid="tool-call-header"
        aria-expanded={isExpanded}
        onClick={toggleExpand}
      >
        <span className="vk-tool-call__title-wrap">
          <Icon name={STATUS_ICONS[status]} spin={status === 'running'} />
          <span className="vk-tool-call__title">{title}</span>
          {toolName && <span className="vk-tool-call__name">{toolName}</span>}
        </span>
        <span className="vk-tool-call__meta">
          {duration !== undefined && (
            <span className="vk-tool-call__duration">{formatDuration(duration)}</span>
          )}
          <span className={`vk-tool-call__status vk-tool-call__status--${status}`} data-testid="tool-call-status">
            {TOOL_STATUS_LABELS[status]}
          </span>
          <Icon name="chevron-down" className={`vk-tool-call__chevron${isExpanded ? ' is-expanded' : ''}`} />
        </span>
      </button>

      {isExpanded && hasBody && (
        <div className="vk-tool-call__body" data-testid="tool-call-body">
          {children}
          {formattedArgs && (
            <div>
              <div className="vk-tool-call__section-label">{argsLabel}</div>
              <pre className="vk-tool-call__payload" data-testid="tool-call-args">{formattedArgs}</pre>
            </div>
          )}
          {formattedResult && (
            <div>
              <div className="vk-tool-call__section-label">{resultLabel}</div>
              <pre className="vk-tool-call__payload" data-testid="tool-call-result">{formattedResult}</pre>
            </div>
          )}
          {errorMessage && (
            <div className="vk-tool-call__error" data-testid="tool-call-error">
              {errorMessage}
            </div>
          )}
        </div>
      )}

      {(status === 'awaiting-approval' || actions) && (
        <div className="vk-tool-call__approval" data-testid="tool-call-approval">
          {actions || (
            <>
              <button
                type="button"
                className="vk-tool-call__btn vk-tool-call__btn--reject"
                data-testid="tool-call-reject-btn"
                onClick={onReject}
              >
                {rejectText}
              </button>
              <button
                type="button"
                className="vk-tool-call__btn vk-tool-call__btn--approve"
                data-testid="tool-call-approve-btn"
                onClick={onApprove}
              >
                {approveText}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
})
