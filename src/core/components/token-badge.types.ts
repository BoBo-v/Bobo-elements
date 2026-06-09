export type TokenBadgeStatus = 'normal' | 'warning' | 'danger'

export interface TokenBadgeProps {
  used?: number
  total?: number
  status?: TokenBadgeStatus
  prefix?: string
}
