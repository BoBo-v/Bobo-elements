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
  const contentRef = useRef<HTMLDivElement | null>(null)
  const shouldStickToBottomRef = useRef(true)
  const previousScrollHeightRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const pendingHasAddedNodesRef = useRef(false)
  const snapshotScrollTopRef = useRef(0)
  const snapshotScrollHeightRef = useRef(0)

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
    }
  }, [])

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
      shouldStickToBottomRef.current = isNearBottom()
    })
  }, [autoScroll, preserveScrollOnPrepend, scrollToBottom, isNearBottom])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    previousScrollHeightRef.current = el.scrollHeight
    shouldStickToBottomRef.current = isNearBottom()

    const observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some(m => m.addedNodes.length > 0)
      scheduleUpdate(hasAddedNodes)
    })
    observer.observe(el, { childList: true, subtree: true, characterData: true })

    const target = contentRef.current || el
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
      <div ref={contentRef} className="vk-conversation-list__content">
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
