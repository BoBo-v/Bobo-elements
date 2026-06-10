import type { ReactNode } from 'react'

export interface ConversationListProps {
  autoScroll?: boolean
  loadingMore?: boolean
  height?: string
  maxHeight?: string
  emptyText?: string
  loadingText?: string
  children?: ReactNode
  onLoadMore?: () => void
  onScroll?: (scrollTop: number) => void
}
