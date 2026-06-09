export interface ConversationListProps {
  autoScroll?: boolean
  loadingMore?: boolean
  maxHeight?: string
  emptyText?: string
  loadingText?: string
}

export interface ConversationListEmits {
  (e: 'load-more'): void
  (e: 'scroll', scrollTop: number): void
}
