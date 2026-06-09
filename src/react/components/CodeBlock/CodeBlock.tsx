import { useState, useCallback, useMemo, useRef, useEffect, memo } from 'react'
import type { CodeBlockProps } from '../../../core/components/code-block.types'
import { copyToClipboard, generateLineNumbers, highlightCode } from '../../../core/components/code-block.logic'
import '../../../components/CodeBlock/style.css'

export const CodeBlock = memo(function CodeBlock({
  code = '',
  language = '',
  showLineNumbers = false,
  copyable = true,
  maxHeight = '400px',
  title,
  copyText = '复制',
  copiedText = '已复制',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lineNumbers = useMemo(() => generateLineNumbers(code), [code])
  const highlightedHtml = useMemo(() => highlightCode(code, language), [code, language])

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
      // clipboard API may fail
    }
  }, [code])

  return (
    <div className="vk-code-block" data-testid="code-block">
      {(title || language || copyable) && (
        <div className="vk-code-block__header">
          {(title || language) ? (
            <span className="vk-code-block__language">{title || language}</span>
          ) : <span />}
          {copyable && (
            <button
              className="vk-code-block__copy-btn"
              data-testid="code-block-copy-btn"
              aria-label={copied ? '已复制' : '复制代码'}
              onClick={handleCopy}
            >
              {copied ? copiedText : copyText}
            </button>
          )}
        </div>
      )}
      <div className="vk-code-block__body" style={{ maxHeight }}>
        {showLineNumbers ? (
          <div className="vk-code-block__lines">
            <div className="vk-code-block__line-numbers">
              {lineNumbers.map(n => (
                <span key={n} className="vk-code-block__line-number">{n}</span>
              ))}
            </div>
            <pre className="vk-code-block__code"><code dangerouslySetInnerHTML={{ __html: highlightedHtml }} /></pre>
          </div>
        ) : (
          <pre className="vk-code-block__code"><code dangerouslySetInnerHTML={{ __html: highlightedHtml }} /></pre>
        )}
      </div>
    </div>
  )
})
