import type { ReactNode, CSSProperties } from 'react'

export interface ConversationListProps {
  autoScroll?: boolean
  loadingMore?: boolean
  /** 触发 onLoadMore 的顶部距离阈值（像素） */
  loadMoreThreshold?: number
  height?: string
  maxHeight?: string
  preserveScrollOnPrepend?: boolean
  /** 用户上滑脱离底部且有内容时，是否显示“回到底部”悬浮按钮 */
  showScrollToBottom?: boolean
  scrollToBottomText?: string
  emptyText?: string
  empty?: ReactNode
  loadingText?: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
  onLoadMore?: () => void
  onScroll?: (scrollTop: number) => void
  onAtBottomChange?: (atBottom: boolean) => void
}

export interface ConversationListRef {
  scrollToBottom: () => void
  getElement: () => HTMLDivElement | null
}
