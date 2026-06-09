import { memo } from 'react'
import type { ThinkingIndicatorProps } from '../../../core/components/thinking-indicator.types'
import '../../../components/ThinkingIndicator/style.css'

export const ThinkingIndicator = memo(function ThinkingIndicator({
  variant = 'dots',
  size = 'default',
  text = '正在思考...',
  ariaLabel = 'AI 正在思考',
}: ThinkingIndicatorProps) {
  const classes = [
    'vk-thinking-indicator',
    size !== 'default' ? `vk-thinking-indicator--${size}` : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
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
