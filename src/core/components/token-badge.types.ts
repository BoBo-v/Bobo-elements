export type TokenBadgeStatus = 'normal' | 'warning' | 'danger'
export type TokenBadgeSize = 'small' | 'default' | 'large'
export type TokenBadgeVariant = 'light' | 'filled'

export interface TokenBadgeProps {
  used?: number
  total?: number
  status?: TokenBadgeStatus
  size?: TokenBadgeSize
  variant?: TokenBadgeVariant
  prefix?: string
}
