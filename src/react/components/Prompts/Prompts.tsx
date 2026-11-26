import { memo } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type {
  PromptsProps as CorePromptsProps,
  PromptItem,
  PromptsLayout,
  PromptsVariant,
} from '../../../core/components/prompts.types'
import Icon from '../Icon'
import '../../../components/Prompts/style.css'

export type { PromptItem, PromptsLayout, PromptsVariant }

export interface PromptsProps extends Omit<CorePromptsProps, 'title'> {
  title?: ReactNode
  className?: string
  style?: CSSProperties
  renderItem?: (item: PromptItem) => ReactNode
  onSelect?: (item: PromptItem) => void
}

export const Prompts = memo(function Prompts({
  title,
  items = [],
  layout = 'grid',
  variant = 'card',
  wrap = true,
  className,
  style,
  renderItem,
  onSelect,
}: PromptsProps) {
  const rootClass = ['vk-prompts', className || ''].filter(Boolean).join(' ')
  const listClass = [
    'vk-prompts__list',
    `vk-prompts__list--${layout}`,
    wrap ? 'vk-prompts__list--wrap' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClass} style={style} data-testid="prompts">
      {title && (
        <div className="vk-prompts__title" data-testid="prompts-title">
          {title}
        </div>
      )}
      <div className={listClass}>
        {items.map(item => (
          <button
            key={item.key}
            type="button"
            className={`vk-prompts__item vk-prompts__item--${variant}`}
            disabled={item.disabled}
            data-testid="prompts-item"
            onClick={() => {
              if (!item.disabled) onSelect?.(item)
            }}
          >
            {renderItem ? (
              renderItem(item)
            ) : (
              <>
                {item.icon && <Icon name={item.icon} className="vk-prompts__icon" />}
                <span className="vk-prompts__content">
                  <span className="vk-prompts__label">{item.label}</span>
                  {item.description && <span className="vk-prompts__desc">{item.description}</span>}
                </span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
})
