import { useMemo, createElement, memo } from 'react'
import type { MarkdownRendererProps } from '../../../core/components/markdown-renderer.types'
import { parseMarkdown } from '../../../core/components/markdown-renderer.logic'
import '../../../components/MarkdownRenderer/style.css'

export const MarkdownRenderer = memo(function MarkdownRenderer({
  content = '',
  tag = 'div',
  breaks = true,
}: MarkdownRendererProps) {
  const html = useMemo(() => parseMarkdown(content, breaks), [content, breaks])

  return createElement(tag, {
    className: 'vk-markdown-renderer',
    dangerouslySetInnerHTML: { __html: html },
    'data-testid': 'markdown-renderer',
  })
})
