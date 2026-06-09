import { useRef, useEffect, useCallback, memo } from 'react'
import type { ConversationListProps } from '../../../core/components/conversation-list.react.types'
import '../../../components/ConversationList/style.css'

export const ConversationList = memo(function ConversationList({
  autoScroll = true,
  loadingMore = false,
  maxHeight = '100%',
  emptyText = '暂无对话',
  loadingText = '加载中...',
  children,
  onLoadMore,
  onScroll,
}: ConversationListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = useCallback(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(() => {
    if (!autoScroll) return
    const el = containerRef.current
    if (!el) return
    const observer = new MutationObserver(scrollToBottom)
    observer.observe(el, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [autoScroll, scrollToBottom])

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    onScroll?.(el.scrollTop)
    if (el.scrollTop === 0) {
      onLoadMore?.()
    }
  }, [onLoadMore, onScroll])

  return (
    <div
      ref={containerRef}
      className="vk-conversation-list"
      style={{ maxHeight }}
      role="log"
      aria-live="polite"
      data-testid="conversation-list"
      onScroll={handleScroll}
    >
      {loadingMore && (
        <div className="vk-conversation-list__load-more" data-testid="conversation-list-loading">
          <span className="vk-conversation-list__loading-spinner" />
          {loadingText}
        </div>
      )}
      <div className="vk-conversation-list__content">
        {children}
      </div>
      {!children && (
        <div className="vk-conversation-list__empty" data-testid="conversation-list-empty">
          {emptyText}
        </div>
      )}
    </div>
  )
})
