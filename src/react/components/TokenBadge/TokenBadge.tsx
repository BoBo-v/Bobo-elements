import { memo } from 'react'
import type { TokenBadgeProps } from '../../../core/components/token-badge.types'
import '../../../components/TokenBadge/style.css'

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return String(n)
}

export const TokenBadge = memo(function TokenBadge({
  used = 0,
  total,
  status = 'normal',
  prefix = 'Tokens',
}: TokenBadgeProps) {
  return (
    <span className={`vk-token-badge vk-token-badge--${status}`} data-testid="token-badge">
      <span className="vk-token-badge__prefix">{prefix}</span>
      <span className="vk-token-badge__value" data-testid="token-badge-value">{formatNumber(used)}</span>
      {total !== undefined && (
        <span data-testid="token-badge-total">/ {formatNumber(total)}</span>
      )}
    </span>
  )
})
