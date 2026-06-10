import { useRef, useEffect, useCallback, useImperativeHandle, forwardRef, memo } from 'react'
import type { ConversationListProps, ConversationListRef } from '../../../core/components/conversation-list.react.types'
import '../../../components/ConversationList/style.css'

const SCROLL_THRESHOLD = 50

export const ConversationList = memo(forwardRef<ConversationListRef, ConversationListProps>(function ConversationList({
  autoScroll = true,
  loadingMore = false,
  height,
  maxHeight = '100%',
  preserveScrollOnPrepend = true,
  emptyText = '暂无对话',
  loadingText = '加载中...',
  children,
  onLoadMore,
  onScroll,
}: ConversationListProps, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const shouldStickToBottomRef = useRef(true)
  const previousScrollHeightRef = useRef(0)

  const isNearBottom = useCallback(() => {
    const el = containerRef.current
    if (!el) return true
    return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD
  }, [])

  const scrollToBottom = useCallback(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  const getElement = useCallback(() => containerRef.current, [])

  useImperativeHandle(ref, () => ({ scrollToBottom, getElement }), [scrollToBottom, getElement])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    previousScrollHeightRef.current = el.scrollHeight
    shouldStickToBottomRef.current = isNearBottom()
    const observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0)
      if (!hasAddedNodes) return
      const oldScrollHeight = previousScrollHeightRef.current
      requestAnimationFrame(() => {
        if (autoScroll && shouldStickToBottomRef.current) {
          scrollToBottom()
        } else if (preserveScrollOnPrepend && el.scrollTop <= SCROLL_THRESHOLD && el.scrollHeight > oldScrollHeight) {
          el.scrollTop = el.scrollHeight - oldScrollHeight
        }
        previousScrollHeightRef.current = el.scrollHeight
        shouldStickToBottomRef.current = isNearBottom()
      })
    })
    observer.observe(el, { childList: true, subtree: true })
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
        if (autoScroll && shouldStickToBottomRef.current) {
          scrollToBottom()
        }
        previousScrollHeightRef.current = el.scrollHeight
        shouldStickToBottomRef.current = isNearBottom()
      })
      : null
    resizeObserver?.observe(el)
    return () => {
      observer.disconnect()
      resizeObserver?.disconnect()
    }
  }, [autoScroll, preserveScrollOnPrepend, scrollToBottom, isNearBottom])

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
}))
