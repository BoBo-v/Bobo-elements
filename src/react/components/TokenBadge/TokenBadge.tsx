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
  size = 'default',
  variant = 'light',
  prefix = 'Tokens',
}: TokenBadgeProps) {
  const classes = [
    'vk-token-badge',
    `vk-token-badge--${status}`,
    size !== 'default' ? `vk-token-badge--${size}` : '',
    variant === 'filled' ? 'vk-token-badge--filled' : '',
  ].filter(Boolean).join(' ')

  return (
    <span className={classes} data-testid="token-badge">
      <span className="vk-token-badge__prefix">{prefix}</span>
      <span className="vk-token-badge__value" data-testid="token-badge-value">{formatNumber(used)}</span>
      {total !== undefined && (
        <span data-testid="token-badge-total">/ {formatNumber(total)}</span>
      )}
    </span>
  )
})
