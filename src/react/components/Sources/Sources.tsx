import { useState, useEffect, memo } from 'react'
import type { CSSProperties } from 'react'
import type {
  SourcesProps as CoreSourcesProps,
  SourceItem,
  SourcesVariant,
} from '../../../core/components/sources.types'
import { getSafeSourceUrl } from '../../../core/components/sources.types'
import Icon from '../Icon'
import '../../../components/Sources/style.css'

export type { SourceItem, SourcesVariant }

export interface SourcesProps extends CoreSourcesProps {
  className?: string
  style?: CSSProperties
  onSelect?: (item: SourceItem) => void
  onExpandedChange?: (expanded: boolean) => void
}

export const Sources = memo(function Sources({
  items = [],
  title,
  variant = 'list',
  collapsible = true,
  expanded,
  defaultExpanded = false,
  className,
  style,
  onSelect,
  onExpandedChange,
}: SourcesProps) {
  const [innerExpanded, setInnerExpanded] = useState(expanded ?? (collapsible ? defaultExpanded : true))

  useEffect(() => {
    if (expanded !== undefined) {
      setInnerExpanded(expanded)
    }
  }, [expanded])

  const isExpanded = collapsible ? (expanded ?? innerExpanded) : true
  const displayTitle = title || `参考来源 (${items.length})`
  const rootClass = ['vk-sources', className || ''].filter(Boolean).join(' ')

  const toggleExpand = () => {
    const next = !isExpanded
    setInnerExpanded(next)
    onExpandedChange?.(next)
  }

  return (
    <div className={rootClass} style={style} data-testid="sources">
      {collapsible ? (
        <button
          type="button"
          className="vk-sources__toggle"
          data-testid="sources-toggle"
          aria-expanded={isExpanded}
          onClick={toggleExpand}
        >
          <Icon name="book-open" />
          <span>{displayTitle}</span>
        </button>
      ) : (
        items.length > 0 && (
          <div className="vk-sources__title" data-testid="sources-title">
            {displayTitle}
          </div>
        )
      )}

      {isExpanded && items.length > 0 && (
        <div className={`vk-sources__list vk-sources__list--${variant}`} data-testid="sources-list">
          {items.map((item, idx) => {
            const safeUrl = getSafeSourceUrl(item.url)
            const content = (
              <>
                <span className="vk-sources__index">{item.index ?? idx + 1}</span>
                <span className="vk-sources__body">
                  <span className="vk-sources__item-title">{item.title}</span>
                  {item.domain && <span className="vk-sources__domain">{item.domain}</span>}
                  {variant !== 'compact' && item.snippet && (
                    <span className="vk-sources__snippet">{item.snippet}</span>
                  )}
                </span>
              </>
            )

            return safeUrl ? (
              <a
                key={item.id}
                className="vk-sources__item"
                href={safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="sources-item"
                onClick={() => onSelect?.(item)}
              >
                {content}
              </a>
            ) : (
              <div
                key={item.id}
                className="vk-sources__item"
                data-testid="sources-item"
                onClick={() => onSelect?.(item)}
              >
                {content}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})
