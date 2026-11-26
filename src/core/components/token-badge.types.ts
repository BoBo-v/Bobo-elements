export type TokenBadgeStatus = 'normal' | 'warning' | 'danger'
export type TokenBadgeSize = 'small' | 'default' | 'large'
export type TokenBadgeVariant = 'light' | 'filled'

export interface TokenBadgeProps {
  used?: number
  total?: number
  /** 输入 Token 数量（可选明细） */
  inputTokens?: number
  /** 输出 Token 数量（可选明细） */
  outputTokens?: number
  /** 缓存命中 Token 数量（可选明细） */
  cachedTokens?: number
  /** 是否显示上下文占比进度条（需配合 total） */
  showProgress?: boolean
  status?: TokenBadgeStatus
  autoStatus?: boolean
  warningThreshold?: number
  dangerThreshold?: number
  size?: TokenBadgeSize
  variant?: TokenBadgeVariant
  prefix?: string
}
