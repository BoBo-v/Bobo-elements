export type SourcesVariant = 'list' | 'cards' | 'compact'

export interface SourceItem {
  id: string | number
  title: string
  url?: string
  domain?: string
  snippet?: string
  index?: number
}

export interface SourcesProps {
  items?: SourceItem[]
  title?: string
  variant?: SourcesVariant
  collapsible?: boolean
  expanded?: boolean
  defaultExpanded?: boolean
}

export interface SourcesEmits {
  (e: 'select', item: SourceItem): void
  (e: 'update:expanded', value: boolean): void
}

/**
 * 仅允许安全的 http(s) 与站内相对路径跳转
 */
export function getSafeSourceUrl(rawUrl?: string): string | undefined {
  if (!rawUrl) return undefined
  const url = rawUrl.trim()
  const lower = url.toLowerCase()
  if (lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('/')) {
    return url
  }
  return undefined
}
