import { useMemo, useState, useEffect, useRef, memo } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type { ReasoningBlockProps as CoreReasoningBlockProps, ReasoningBlockStatus } from '../../../core/components/reasoning-block.types'
import { formatDuration } from '../../../core/components/ai-format'
import { Collapse, CollapseItem } from '../Collapse'
import Icon from '../Icon'
import '../../../components/ReasoningBlock/style.css'

export type { ReasoningBlockStatus }

export interface ReasoningBlockProps extends CoreReasoningBlockProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export const ReasoningBlock = memo(function ReasoningBlock({
  title = '分析过程',
  expanded = false,
  status = 'done',
  autoCollapse = false,
  duration,
  tokenCount,
  tokenUnit = 'tokens',
  onExpandedChange,
  className,
  style,
  children,
}: ReasoningBlockProps) {
  const [innerExpanded, setInnerExpanded] = useState(expanded)
  const prevStatusRef = useRef<ReasoningBlockStatus>(status)

  useEffect(() => {
    setInnerExpanded(expanded)
  }, [expanded])

  useEffect(() => {
    // 当思考状态从 thinking 转为 done 且开启 autoCollapse 时自动收起
    if (autoCollapse && prevStatusRef.current === 'thinking' && status === 'done') {
      setInnerExpanded(false)
      onExpandedChange?.(false)
    }
    prevStatusRef.current = status
  }, [status, autoCollapse, onExpandedChange])

  const titleContent = useMemo(() => (
    <div className="vk-reasoning-block__header">
      <Icon name="brain" className="vk-reasoning-block__icon" />
      <span className="vk-reasoning-block__title">{title}</span>
      {(duration !== undefined || tokenCount !== undefined) && (
        <span className="vk-reasoning-block__meta">
          {duration !== undefined && (
            <span className="vk-reasoning-block__duration">
              <Icon name="clock" /> {formatDuration(duration)}
            </span>
          )}
          {tokenCount !== undefined && (
            <span className="vk-reasoning-block__tokens">
              {tokenCount} {tokenUnit}
            </span>
          )}
        </span>
      )}
    </div>
  ), [title, duration, tokenCount, tokenUnit])

  const handleChange = (names: Array<string | number>) => {
    const nextExpanded = names.includes('reasoning')
    setInnerExpanded(nextExpanded)
    onExpandedChange?.(nextExpanded)
  }

  const rootClass = [
    'vk-reasoning-block',
    status === 'thinking' ? 'is-thinking' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClass} style={style} data-testid="reasoning-block">
      <Collapse modelValue={innerExpanded ? ['reasoning'] : []} onChange={handleChange}>
        <CollapseItem name="reasoning" title={titleContent}>
          <div className="vk-reasoning-block__content">{children}</div>
        </CollapseItem>
      </Collapse>
    </div>
  )
})
