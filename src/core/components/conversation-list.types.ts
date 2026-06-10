export interface ConversationListProps {
  autoScroll?: boolean
  loadingMore?: boolean
  height?: string
  maxHeight?: string
  emptyText?: string
  loadingText?: string
}

export interface ConversationListEmits {
  (e: 'load-more'): void
  (e: 'scroll', scrollTop: number): void
}
