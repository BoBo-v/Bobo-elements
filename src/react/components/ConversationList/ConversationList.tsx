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
  const previousFirstChildRef = useRef<Element | null>(null)
  const snapshotFirstChildRef = useRef<Element | null>(null)
  const isProgrammaticScrollRef = useRef(false)
  const programmaticScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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

  const cancelProgrammaticScroll = useCallback(() => {
    isProgrammaticScrollRef.current = false
    if (programmaticScrollTimerRef.current !== null) {
      clearTimeout(programmaticScrollTimerRef.current)
      programmaticScrollTimerRef.current = null
    }
  }, [])

  const scrollToBottom = useCallback((instant = false) => {
    const el = containerRef.current
    if (el) {
      cancelProgrammaticScroll()
      if (instant) {
        if (typeof el.scrollTo === 'function') {
          el.scrollTo({ top: el.scrollHeight, behavior: 'instant' as ScrollBehavior })
        } else {
          el.scrollTop = el.scrollHeight
        }
      } else {
        // 平滑滚动到底部期间屏蔽中间帧 scroll 事件对吸底状态的误覆盖
        isProgrammaticScrollRef.current = true
        programmaticScrollTimerRef.current = setTimeout(() => {
          cancelProgrammaticScroll()
        }, 600)
        if (typeof el.scrollTo === 'function') {
          el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
        } else {
          el.scrollTop = el.scrollHeight
        }
      }
      shouldStickToBottomRef.current = true
      updateAtBottom(true)
    }
  }, [updateAtBottom, cancelProgrammaticScroll])

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
      snapshotFirstChildRef.current = previousFirstChildRef.current
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
      const currentFirstChild = contentRef.current?.firstElementChild ?? null
      const firstChildChanged = snapshotFirstChildRef.current !== null && currentFirstChild !== snapshotFirstChildRef.current
      snapshotFirstChildRef.current = null

      if (
        preserveScrollOnPrepend &&
        wasPrepend &&
        firstChildChanged &&
        !shouldStickToBottomRef.current &&
        oldScrollTop <= SCROLL_THRESHOLD &&
        newScrollHeight > oldScrollHeight
      ) {
        // 仅在顶部确实前插了历史节点时补偿滚动锚点，避免底部来新消息误推视口
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
      previousFirstChildRef.current = contentRef.current?.firstElementChild ?? null
      if (!isProgrammaticScrollRef.current) {
        const nearBottom = isNearBottom()
        shouldStickToBottomRef.current = nearBottom
        updateAtBottom(nearBottom)
      }
    })
  }, [autoScroll, preserveScrollOnPrepend, scrollToBottom, isNearBottom, updateAtBottom])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // 初始挂载且开启 autoScroll 时，若存在溢出内容则直接定位到底部最新消息
    if (autoScroll && el.scrollHeight > el.clientHeight) {
      scrollToBottom(true)
    }

    previousScrollHeightRef.current = el.scrollHeight
    previousFirstChildRef.current = contentRef.current?.firstElementChild ?? null
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
      cancelProgrammaticScroll()
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      observer.disconnect()
      resizeObserver?.disconnect()
    }
  }, [scheduleUpdate, isNearBottom, autoScroll, scrollToBottom, cancelProgrammaticScroll])

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (previousScrollHeightRef.current === 0 && el.scrollHeight > 0) {
      previousScrollHeightRef.current = el.scrollHeight
    }
    const nearBottom = isNearBottom()
    if (isProgrammaticScrollRef.current) {
      if (nearBottom) {
        cancelProgrammaticScroll()
      }
      onScroll?.(el.scrollTop)
      return
    }
    shouldStickToBottomRef.current = nearBottom
    updateAtBottom(nearBottom)
    onScroll?.(el.scrollTop)
    if (el.scrollTop <= loadMoreThreshold && !loadingMore) {
      onLoadMore?.()
    }
  }, [isNearBottom, updateAtBottom, loadMoreThreshold, loadingMore, onLoadMore, onScroll, cancelProgrammaticScroll])

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
      onWheel={cancelProgrammaticScroll}
      onTouchStart={cancelProgrammaticScroll}
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
