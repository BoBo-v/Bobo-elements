import type { SessionItem } from './session-list.types'

export interface SessionGroup {
  label: string
  items: SessionItem[]
}

function getTimeBucketLabel(updatedAt?: string | number | Date): string {
  if (!updatedAt) return '更早'
  const date = updatedAt instanceof Date ? updatedAt : new Date(updatedAt)
  if (Number.isNaN(date.getTime())) return '更早'

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const diffDays = Math.floor((startOfToday - new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) / 86_400_000)

  if (diffDays <= 0) return '今天'
  if (diffDays === 1) return '昨天'
  if (diffDays <= 7) return '7 天内'
  return '更早'
}

/**
 * 过滤并按置顶 / 时间维度分组会话列表
 */
export function groupSessions(items: SessionItem[], keyword = '', groupByTime = true): SessionGroup[] {
  const q = keyword.trim().toLowerCase()
  const filtered = q ? items.filter(item => item.title.toLowerCase().includes(q)) : items
  if (filtered.length === 0) return []

  const pinned = filtered.filter(i => i.pinned)
  const rest = filtered.filter(i => !i.pinned)
  const groups: SessionGroup[] = []

  if (pinned.length > 0) {
    groups.push({ label: '置顶会话', items: pinned })
  }

  if (!groupByTime) {
    if (rest.length > 0) groups.push({ label: pinned.length > 0 ? '全部会话' : '', items: rest })
    return groups
  }

  const bucketMap = new Map<string, SessionItem[]>()
  for (const item of rest) {
    const label = item.group || getTimeBucketLabel(item.updatedAt)
    const list = bucketMap.get(label) || []
    list.push(item)
    bucketMap.set(label, list)
  }

  bucketMap.forEach((groupItems, label) => {
    groups.push({ label, items: groupItems })
  })

  return groups
}
