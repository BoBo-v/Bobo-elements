export interface ConversationListProps {
  autoScroll?: boolean
  loadingMore?: boolean
  height?: string
  maxHeight?: string
  preserveScrollOnPrepend?: boolean
  emptyText?: string
  loadingText?: string
}

export interface ConversationListEmits {
  (e: 'load-more'): void
  (e: 'scroll', scrollTop: number): void
}

export interface ConversationListInstance {
  scrollToBottom: () => void
  getElement: () => HTMLElement | null
}
