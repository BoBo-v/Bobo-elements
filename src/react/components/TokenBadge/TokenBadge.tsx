import { memo } from 'react'
import type { CSSProperties } from 'react'
import type {
  TokenBadgeProps as CoreTokenBadgeProps,
  TokenBadgeStatus,
  TokenBadgeSize,
  TokenBadgeVariant,
} from '../../../core/components/token-badge.types'
import { formatTokenCount, resolveTokenStatus } from '../../../core/components/ai-format'
import '../../../components/TokenBadge/style.css'

export type { TokenBadgeStatus, TokenBadgeSize, TokenBadgeVariant }

export interface TokenBadgeProps extends CoreTokenBadgeProps {
  className?: string
  style?: CSSProperties
}

export const TokenBadge = memo(function TokenBadge({
  used = 0,
  total,
  inputTokens,
  outputTokens,
  cachedTokens,
  showProgress = false,
  status = 'normal',
  autoStatus = false,
  warningThreshold = 0.8,
  dangerThreshold = 1,
  size = 'default',
  variant = 'light',
  prefix = 'Tokens',
  className,
  style,
}: TokenBadgeProps) {
  const computedStatus = resolveTokenStatus(used, total, status, autoStatus, warningThreshold, dangerThreshold)
  const hasBreakdown = inputTokens !== undefined || outputTokens !== undefined || cachedTokens !== undefined
  const progressPercent = total !== undefined && total > 0
    ? Math.min(100, Math.max(0, Math.round((used / total) * 100)))
    : null

  const detailTitle = [
    inputTokens !== undefined ? `输入: ${inputTokens}` : '',
    outputTokens !== undefined ? `输出: ${outputTokens}` : '',
    cachedTokens !== undefined ? `缓存: ${cachedTokens}` : '',
  ].filter(Boolean).join(' · ')

  const classes = [
    'vk-token-badge',
    `vk-token-badge--${computedStatus}`,
    size !== 'default' ? `vk-token-badge--${size}` : '',
    variant === 'filled' ? 'vk-token-badge--filled' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <span className={classes} style={style} title={detailTitle || undefined} data-testid="token-badge">
      <span className="vk-token-badge__prefix">{prefix}</span>
      <span className="vk-token-badge__value" data-testid="token-badge-value">{formatTokenCount(used)}</span>
      {total !== undefined && (
        <span data-testid="token-badge-total">/ {formatTokenCount(total)}</span>
      )}
      {hasBreakdown && (
        <span className="vk-token-badge__breakdown" data-testid="token-badge-breakdown">
          {inputTokens !== undefined && `↑${formatTokenCount(inputTokens)}`}
          {outputTokens !== undefined && `↓${formatTokenCount(outputTokens)}`}
          {cachedTokens !== undefined && `⚡${formatTokenCount(cachedTokens)}`}
        </span>
      )}
      {showProgress && progressPercent !== null && (
        <span className="vk-token-badge__progress" data-testid="token-badge-progress">
          <span className="vk-token-badge__progress-bar" style={{ width: `${progressPercent}%` }} />
        </span>
      )}
    </span>
  )
})
