import type { TokenBadgeStatus } from './token-badge.types'

/**
 * 格式化 Token 数量（保留一位小数的 K / M 缩写，兼顾精确度与紧凑排版）
 */
export function formatTokenCount(n: number): string {
  if (!Number.isFinite(n)) return '0'
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(1)}K`
  return String(n)
}

/**
 * 根据已用 / 总量比例及阈值推导 Token 状态色
 */
export function resolveTokenStatus(
  used: number,
  total: number | undefined,
  status: TokenBadgeStatus,
  autoStatus: boolean,
  warningThreshold: number,
  dangerThreshold: number
): TokenBadgeStatus {
  if (!autoStatus || total === undefined || total <= 0) return status
  const ratio = used / total
  if (ratio >= dangerThreshold) return 'danger'
  if (ratio >= warningThreshold) return 'warning'
  return 'normal'
}

/**
 * 格式化耗时（毫秒 -> ms / s）
 */
export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return '0ms'
  if (ms < 1000) return `${Math.round(ms)}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

/**
 * 格式化消息时间戳，支持自定义格式化器与区域设置
 */
export function formatTimestamp(
  timestamp?: string | number | Date,
  locale = 'zh-CN',
  formatter?: (date: Date) => string
): string {
  if (timestamp === undefined || timestamp === null || timestamp === '') return ''
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
  if (Number.isNaN(date.getTime())) return ''
  if (formatter) return formatter(date)
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
}
