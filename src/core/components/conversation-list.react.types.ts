import type { ReactNode } from 'react'

export interface ConversationListProps {
  autoScroll?: boolean
  loadingMore?: boolean
  height?: string
  maxHeight?: string
  preserveScrollOnPrepend?: boolean
  emptyText?: string
  loadingText?: string
  children?: ReactNode
  onLoadMore?: () => void
  onScroll?: (scrollTop: number) => void
}

export interface ConversationListRef {
  scrollToBottom: () => void
  getElement: () => HTMLDivElement | null
}
