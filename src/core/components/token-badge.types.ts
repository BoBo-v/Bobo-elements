export type TokenBadgeStatus = 'normal' | 'warning' | 'danger'
export type TokenBadgeSize = 'small' | 'default' | 'large'
export type TokenBadgeVariant = 'light' | 'filled'

export interface TokenBadgeProps {
  used?: number
  total?: number
  status?: TokenBadgeStatus
  autoStatus?: boolean
  warningThreshold?: number
  dangerThreshold?: number
  size?: TokenBadgeSize
  variant?: TokenBadgeVariant
  prefix?: string
}
