import { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef, memo } from 'react'
import type { ConversationListProps, ConversationListRef } from '../../../core/components/conversation-list.react.types'
import '../../../components/ConversationList/style.css'

const SCROLL_THRESHOLD = 50

export const ConversationList = memo(forwardRef<ConversationListRef, ConversationListProps>(function ConversationList({
  autoScroll = true,
  loadingMore = false,
  loadMoreThreshold = 16,
  height,
  maxHeight = '100%',
  preserveScrollOnPrepend = true,
  showScrollToBottom = true,
  scrollToBottomText = '回到底部',
  emptyText = '暂无对话',
  empty,
  loadingText = '加载中...',
  className,
  style,
  children,
  onLoadMore,
  onScroll,
  onAtBottomChange,
}: ConversationListProps, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const shouldStickToBottomRef = useRef(true)
  const previousScrollHeightRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const pendingHasAddedNodesRef = useRef(false)
  const snapshotScrollTopRef = useRef(0)
  const snapshotScrollHeightRef = useRef(0)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const isAtBottomRef = useRef(true)

  const updateAtBottom = useCallback((next: boolean) => {
    if (isAtBottomRef.current !== next) {
      isAtBottomRef.current = next
      setIsAtBottom(next)
      onAtBottomChange?.(next)
    }
  }, [onAtBottomChange])

  const isNearBottom = useCallback(() => {
    const el = containerRef.current
    if (!el) return true
    return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD
  }, [])

  const scrollToBottom = useCallback((instant = false) => {
    const el = containerRef.current
    if (el) {
      if (instant && typeof el.scrollTo === 'function') {
        el.scrollTo({ top: el.scrollHeight, behavior: 'instant' as ScrollBehavior })
      } else {
        el.scrollTop = el.scrollHeight
      }
      shouldStickToBottomRef.current = true
      updateAtBottom(true)
    }
  }, [updateAtBottom])

  const getElement = useCallback(() => containerRef.current, [])

  useImperativeHandle(ref, () => ({ scrollToBottom: () => scrollToBottom(false), getElement }), [scrollToBottom, getElement])

  const scheduleUpdate = useCallback((hasAddedNodes = false) => {
    if (hasAddedNodes) {
      pendingHasAddedNodesRef.current = true
    }
    const el = containerRef.current
    if (!el) return

    if (rafIdRef.current === null) {
      snapshotScrollTopRef.current = el.scrollTop
      snapshotScrollHeightRef.current = previousScrollHeightRef.current > 0 ? previousScrollHeightRef.current : el.scrollHeight
    }

    if (rafIdRef.current !== null) return

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null
      const currentEl = containerRef.current
      if (!currentEl) return

      const newScrollHeight = currentEl.scrollHeight
      const wasPrepend = pendingHasAddedNodesRef.current
      pendingHasAddedNodesRef.current = false
      const oldScrollTop = snapshotScrollTopRef.current
      const oldScrollHeight = snapshotScrollHeightRef.current

      if (
        preserveScrollOnPrepend &&
        wasPrepend &&
        !shouldStickToBottomRef.current &&
        oldScrollTop <= SCROLL_THRESHOLD &&
        newScrollHeight > oldScrollHeight
      ) {
        // 历史消息前插时补偿滚动高度差，防止视口跳动
        const diff = newScrollHeight - oldScrollHeight
        const targetScrollTop = oldScrollTop + diff
        if (typeof currentEl.scrollTo === 'function') {
          currentEl.scrollTo({ top: targetScrollTop, behavior: 'instant' as ScrollBehavior })
        } else {
          currentEl.scrollTop = targetScrollTop
        }
      } else if (autoScroll && shouldStickToBottomRef.current) {
        scrollToBottom(true)
      }

      previousScrollHeightRef.current = currentEl.scrollHeight
      const nearBottom = isNearBottom()
      shouldStickToBottomRef.current = nearBottom
      updateAtBottom(nearBottom)
    })
  }, [autoScroll, preserveScrollOnPrepend, scrollToBottom, isNearBottom, updateAtBottom])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    previousScrollHeightRef.current = el.scrollHeight
    const nearBottom = isNearBottom()
    shouldStickToBottomRef.current = nearBottom
    isAtBottomRef.current = nearBottom
    setIsAtBottom(nearBottom)

    // 仅监听消息内容容器变化，避免加载条或“回到底部”按钮显隐触发误判
    const target = contentRef.current || el
    const observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0)
      scheduleUpdate(hasAddedNodes)
    })
    observer.observe(target, { childList: true, subtree: true, characterData: true })

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
        scheduleUpdate(false)
      })
      : null
    resizeObserver?.observe(target)

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      observer.disconnect()
      resizeObserver?.disconnect()
    }
  }, [scheduleUpdate, isNearBottom])

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (previousScrollHeightRef.current === 0 && el.scrollHeight > 0) {
      previousScrollHeightRef.current = el.scrollHeight
    }
    const nearBottom = isNearBottom()
    shouldStickToBottomRef.current = nearBottom
    updateAtBottom(nearBottom)
    onScroll?.(el.scrollTop)
    if (el.scrollTop <= loadMoreThreshold && !loadingMore) {
      onLoadMore?.()
    }
  }, [isNearBottom, updateAtBottom, loadMoreThreshold, loadingMore, onLoadMore, onScroll])

  const rootClass = ['vk-conversation-list', className || ''].filter(Boolean).join(' ')

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={{ height, maxHeight, ...style }}
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
      <div ref={contentRef} className="vk-conversation-list__content">
        {children}
      </div>
      {!children && (
        <div className="vk-conversation-list__empty" data-testid="conversation-list-empty">
          {empty ?? emptyText}
        </div>
      )}
      {showScrollToBottom && children && !isAtBottom && (
        <button
          type="button"
          className="vk-conversation-list__scroll-btn"
          data-testid="conversation-list-scroll-btn"
          aria-label={scrollToBottomText}
          onClick={() => scrollToBottom(false)}
        >
          ↓ {scrollToBottomText}
        </button>
      )}
    </div>
  )
}))
