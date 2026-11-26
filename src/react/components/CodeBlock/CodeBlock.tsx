import { useState, useCallback, useMemo, useRef, useEffect, memo } from 'react'
import type { CSSProperties } from 'react'
import type { CodeBlockProps as CoreCodeBlockProps } from '../../../core/components/code-block.types'
import { copyToClipboard, highlightCode, wrapLines } from '../../../core/components/code-block.logic'
import '../../../components/CodeBlock/style.css'

export interface CodeBlockProps extends CoreCodeBlockProps {
  className?: string
  style?: CSSProperties
}

export const CodeBlock = memo(function CodeBlock({
  code = '',
  language = '',
  showLineNumbers = false,
  copyable = true,
  maxHeight = '500px',
  scrollable = true,
  wrap = false,
  theme = 'dark',
  highlightLines,
  title,
  copyText = '复制',
  copiedText = '已复制',
  highlighter,
  showWrapToggle = false,
  collapsible = false,
  defaultCollapsed = false,
  wrapText = '自动换行',
  unwrapText = '取消换行',
  expandText = '展开',
  collapseText = '收起',
  className,
  style,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isWrapped, setIsWrapped] = useState(wrap)
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setIsWrapped(wrap)
  }, [wrap])

  const rawHighlightedHtml = useMemo(
    () => (highlighter ? highlighter(code, language) : highlightCode(code, language)),
    [code, language, highlighter]
  )

  const codeLines = useMemo(() => rawHighlightedHtml.split('\n'), [rawHighlightedHtml])

  const highlightedHtml = useMemo(() => {
    return highlightLines?.length ? wrapLines(rawHighlightedHtml, highlightLines) : rawHighlightedHtml
  }, [rawHighlightedHtml, highlightLines])

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(code)
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // 忽略剪贴板权限异常
    }
  }, [code])

  const hasHeader = Boolean(title || language || copyable || showWrapToggle || collapsible)
  const rootClass = [
    'vk-code-block',
    theme === 'light' ? 'vk-code-block--light' : '',
    isCollapsed ? 'is-collapsed' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClass} style={style} data-testid="code-block">
      {hasHeader && (
        <div className="vk-code-block__header">
          {(title || language) ? (
            <span className="vk-code-block__language">{title || language}</span>
          ) : <span />}
          <div className="vk-code-block__actions">
            {showWrapToggle && (
              <button
                type="button"
                className="vk-code-block__tool-btn"
                data-testid="code-block-wrap-btn"
                aria-pressed={isWrapped}
                onClick={() => setIsWrapped(prev => !prev)}
              >
                {isWrapped ? unwrapText : wrapText}
              </button>
            )}
            {collapsible && (
              <button
                type="button"
                className="vk-code-block__tool-btn"
                data-testid="code-block-collapse-btn"
                aria-expanded={!isCollapsed}
                onClick={() => setIsCollapsed(prev => !prev)}
              >
                {isCollapsed ? expandText : collapseText}
              </button>
            )}
            {copyable && (
              <button
                type="button"
                className="vk-code-block__copy-btn"
                data-testid="code-block-copy-btn"
                aria-label={copied ? copiedText : copyText}
                onClick={handleCopy}
              >
                {copied ? copiedText : copyText}
              </button>
            )}
          </div>
        </div>
      )}
      {!isCollapsed && (
        <div className="vk-code-block__body" style={{ maxHeight: scrollable ? maxHeight : undefined }}>
          <pre className={`vk-code-block__code${isWrapped ? ' vk-code-block__code--wrap' : ''}`}>
            {showLineNumbers ? (
              <code className="vk-code-block__table">
                {codeLines.map((lineHtml, idx) => {
                  const lineNum = idx + 1
                  const isHighlighted = highlightLines?.includes(lineNum)
                  return (
                    <span
                      key={lineNum}
                      className={`vk-code-block__row${isHighlighted ? ' vk-code-block__line--highlighted' : ''}`}
                    >
                      <span className="vk-code-block__line-number">{lineNum}</span>
                      <span
                        className="vk-code-block__line-content"
                        dangerouslySetInnerHTML={{ __html: lineHtml || ' ' }}
                      />
                    </span>
                  )
                })}
              </code>
            ) : (
              <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
            )}
          </pre>
        </div>
      )}
    </div>
  )
})
