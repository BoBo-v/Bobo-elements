import { useMemo, useCallback, useEffect, useRef, memo } from 'react'
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react'
import type { MarkdownRendererProps as CoreMarkdownRendererProps } from '../../../core/components/markdown-renderer.types'
import { parseMarkdown } from '../../../core/components/markdown-renderer.logic'
import { copyToClipboard } from '../../../core/components/code-block.logic'
import '../../../components/MarkdownRenderer/style.css'

export interface MarkdownRendererProps extends Omit<CoreMarkdownRendererProps, 'onLinkClick'> {
  className?: string
  style?: CSSProperties
  onLinkClick?: (href: string, event: ReactMouseEvent<HTMLDivElement>) => void
}

export const MarkdownRenderer = memo(function MarkdownRenderer({
  content = '',
  breaks = true,
  streaming = false,
  codeCopyable = true,
  codeCopyText = '复制',
  codeCopiedText = '已复制',
  className,
  style,
  onLinkClick,
}: MarkdownRendererProps) {
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [])

  const html = useMemo(
    () =>
      parseMarkdown(content, {
        breaks,
        streaming,
        codeCopyable,
        codeCopyText,
      }),
    [content, breaks, streaming, codeCopyable, codeCopyText]
  )

  const handleClick = useCallback(
    async (event: ReactMouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      const copyBtn = target.closest('.vk-md-code-copy') as HTMLButtonElement | null
      if (copyBtn) {
        const encoded = copyBtn.getAttribute('data-md-copy') || ''
        try {
          await copyToClipboard(decodeURIComponent(encoded))
          copyBtn.textContent = codeCopiedText
          copyBtn.setAttribute('aria-label', codeCopiedText)
          const timer = setTimeout(() => {
            copyBtn.textContent = codeCopyText
            copyBtn.setAttribute('aria-label', codeCopyText)
            timersRef.current.delete(timer)
          }, 2000)
          timersRef.current.add(timer)
        } catch {
          // 忽略剪贴板权限异常
        }
        return
      }

      const linkEl = target.closest('a.vk-md-link') as HTMLAnchorElement | null
      if (linkEl) {
        const href = linkEl.getAttribute('href') || ''
        onLinkClick?.(href, event)
      }
    },
    [codeCopyText, codeCopiedText, onLinkClick]
  )

  const rootClass = ['vk-markdown-renderer', className || ''].filter(Boolean).join(' ')

  return (
    <div
      className={rootClass}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
      data-testid="markdown-renderer"
      onClick={handleClick}
    />
  )
})
