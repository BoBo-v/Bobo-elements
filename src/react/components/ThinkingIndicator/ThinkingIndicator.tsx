import { memo } from 'react'
import type { CSSProperties } from 'react'
import type {
  ThinkingIndicatorProps as CoreThinkingIndicatorProps,
  ThinkingIndicatorVariant,
  ThinkingIndicatorColor,
} from '../../../core/components/thinking-indicator.types'
import '../../../components/ThinkingIndicator/style.css'

export type { ThinkingIndicatorVariant, ThinkingIndicatorColor }

export interface ThinkingIndicatorProps extends CoreThinkingIndicatorProps {
  className?: string
  style?: CSSProperties
}

export const ThinkingIndicator = memo(function ThinkingIndicator({
  variant = 'dots',
  size = 'default',
  color = 'primary',
  text = '正在思考...',
  ariaLabel = 'AI 正在思考',
  className,
  style,
}: ThinkingIndicatorProps) {
  const classes = [
    'vk-thinking-indicator',
    size !== 'default' ? `vk-thinking-indicator--${size}` : '',
    `vk-thinking-indicator--${color}`,
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      style={style}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      data-testid="thinking-indicator"
    >
      {variant === 'dots' && (
        <div className="vk-thinking-indicator__dots" data-testid="thinking-indicator-dots">
          <span className="vk-thinking-indicator__dot" />
          <span className="vk-thinking-indicator__dot" />
          <span className="vk-thinking-indicator__dot" />
        </div>
      )}
      {variant === 'pulse' && (
        <div className="vk-thinking-indicator__pulse" data-testid="thinking-indicator-pulse" />
      )}
      {variant === 'wave' && (
        <div className="vk-thinking-indicator__wave" data-testid="thinking-indicator-wave">
          <span className="vk-thinking-indicator__wave-bar" />
          <span className="vk-thinking-indicator__wave-bar" />
          <span className="vk-thinking-indicator__wave-bar" />
          <span className="vk-thinking-indicator__wave-bar" />
          <span className="vk-thinking-indicator__wave-bar" />
        </div>
      )}
      {text && <span className="vk-thinking-indicator__text">{text}</span>}
    </div>
  )
})
