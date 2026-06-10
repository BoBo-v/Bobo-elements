import { useRef, useEffect, useCallback, memo } from 'react'
import type { ConversationListProps } from '../../../core/components/conversation-list.react.types'
import '../../../components/ConversationList/style.css'

const SCROLL_THRESHOLD = 50

export const ConversationList = memo(function ConversationList({
  autoScroll = true,
  loadingMore = false,
  height,
  maxHeight = '100%',
  emptyText = '暂无对话',
  loadingText = '加载中...',
  children,
  onLoadMore,
  onScroll,
}: ConversationListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const shouldStickToBottomRef = useRef(true)

  const isNearBottom = useCallback(() => {
    const el = containerRef.current
    if (!el) return true
    return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD
  }, [])

  const scrollToBottom = useCallback(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    shouldStickToBottomRef.current = isNearBottom()
    const observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0)
      if (autoScroll && hasAddedNodes && shouldStickToBottomRef.current) {
        scrollToBottom()
      }
      shouldStickToBottomRef.current = isNearBottom()
    })
    observer.observe(el, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [autoScroll, scrollToBottom, isNearBottom])

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    shouldStickToBottomRef.current = isNearBottom()
    onScroll?.(el.scrollTop)
    if (el.scrollTop === 0 && !loadingMore) {
      onLoadMore?.()
    }
  }, [isNearBottom, loadingMore, onLoadMore, onScroll])

  return (
    <div
      ref={containerRef}
      className="vk-conversation-list"
      style={{ height, maxHeight }}
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
