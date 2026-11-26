import { useMemo, memo } from 'react'
import type { CSSProperties } from 'react'
import type {
  DiffCodeBlockProps as CoreDiffCodeBlockProps,
  DiffLine,
  DiffLineType,
} from '../../../core/components/diff-code-block.types'
import { computeLineDiff } from '../../../core/components/diff-code-block.logic'
import '../../../components/DiffCodeBlock/style.css'

export type { DiffLine, DiffLineType }

export interface DiffCodeBlockProps extends CoreDiffCodeBlockProps {
  className?: string
  style?: CSSProperties
  onApply?: (newCode: string) => void
  onReject?: () => void
}

export const DiffCodeBlock = memo(function DiffCodeBlock({
  oldCode = '',
  newCode = '',
  language = '',
  title = '',
  theme = 'dark',
  showLineNumbers = true,
  actionable = false,
  applyText = '应用修改',
  rejectText = '忽略',
  className,
  style,
  onApply,
  onReject,
}: DiffCodeBlockProps) {
  const diffLines = useMemo(() => computeLineDiff(oldCode, newCode), [oldCode, newCode])
  const addedCount = useMemo(() => diffLines.filter(l => l.type === 'added').length, [diffLines])
  const removedCount = useMemo(() => diffLines.filter(l => l.type === 'removed').length, [diffLines])

  const rootClass = [
    'vk-diff-code-block',
    theme === 'light' ? 'vk-diff-code-block--light' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClass} style={style} data-testid="diff-code-block">
      <div className="vk-diff-code-block__header">
        <div>
          <span>{title || language || 'diff'}</span>
          <span className="vk-diff-code-block__stats">
            <span className="vk-diff-code-block__stat-add">+{addedCount}</span>
            <span className="vk-diff-code-block__stat-del">-{removedCount}</span>
          </span>
        </div>
        {actionable && (
          <div className="vk-diff-code-block__actions">
            <button
              type="button"
              className="vk-diff-code-block__btn"
              data-testid="diff-reject-btn"
              onClick={onReject}
            >
              {rejectText}
            </button>
            <button
              type="button"
              className="vk-diff-code-block__btn vk-diff-code-block__btn--apply"
              data-testid="diff-apply-btn"
              onClick={() => onApply?.(newCode)}
            >
              {applyText}
            </button>
          </div>
        )}
      </div>

      <div className="vk-diff-code-block__body">
        {diffLines.map((line, idx) => (
          <div
            key={idx}
            className={`vk-diff-code-block__line vk-diff-code-block__line--${line.type}`}
            data-testid="diff-code-line"
          >
            {showLineNumbers && (
              <>
                <span className="vk-diff-code-block__ln">{line.oldLine ?? ''}</span>
                <span className="vk-diff-code-block__ln">{line.newLine ?? ''}</span>
              </>
            )}
            <span className="vk-diff-code-block__marker">
              {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
            </span>
            <span className="vk-diff-code-block__text">{line.content}</span>
          </div>
        ))}
      </div>
    </div>
  )
})
