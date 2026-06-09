import { useMemo, memo } from 'react'
import type { ReactNode } from 'react'
import type { ReasoningBlockProps } from '../../../core/components/reasoning-block.types'
import { Collapse, CollapseItem } from '../Collapse'
import Icon from '../Icon'
import '../../../components/ReasoningBlock/style.css'

function formatDuration(ms: number): string {
  if (ms < 1000) return ms + 'ms'
  return (ms / 1000).toFixed(1) + 's'
}

interface ReasoningBlockInternalProps extends ReasoningBlockProps {
  children?: ReactNode
}

export const ReasoningBlock = memo(function ReasoningBlock({
  title = '思考过程',
  expanded = false,
  duration,
  tokenCount,
  children,
}: ReasoningBlockInternalProps) {
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
              {tokenCount} tokens
            </span>
          )}
        </span>
      )}
    </div>
  ), [title, duration, tokenCount])

  return (
    <div className="vk-reasoning-block" data-testid="reasoning-block">
      <Collapse modelValue={expanded ? ['reasoning'] : []}>
        <CollapseItem name="reasoning" title={titleContent}>
          <div className="vk-reasoning-block__content">{children}</div>
        </CollapseItem>
      </Collapse>
    </div>
  )
})
