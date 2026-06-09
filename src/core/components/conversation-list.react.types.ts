import type { ReactNode } from 'react'

export interface ConversationListProps {
  autoScroll?: boolean
  loadingMore?: boolean
  maxHeight?: string
  emptyText?: string
  loadingText?: string
  children?: ReactNode
  onLoadMore?: () => void
  onScroll?: (scrollTop: number) => void
}
