export interface ConversationListProps {
  autoScroll?: boolean
  loadingMore?: boolean
  /** 触发 load-more 的顶部距离阈值（像素） */
  loadMoreThreshold?: number
  height?: string
  maxHeight?: string
  preserveScrollOnPrepend?: boolean
  /** 用户上滑脱离底部且有内容时，是否显示“回到底部”悬浮按钮 */
  showScrollToBottom?: boolean
  scrollToBottomText?: string
  emptyText?: string
  loadingText?: string
}

export interface ConversationListEmits {
  (e: 'load-more'): void
  (e: 'scroll', scrollTop: number): void
  (e: 'at-bottom-change', atBottom: boolean): void
}

export interface ConversationListInstance {
  scrollToBottom: () => void
  getElement: () => HTMLElement | null
}
