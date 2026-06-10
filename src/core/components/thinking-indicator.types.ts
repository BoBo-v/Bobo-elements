export type ThinkingIndicatorVariant = 'dots' | 'pulse' | 'wave'
export type ThinkingIndicatorColor = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface ThinkingIndicatorProps {
  variant?: ThinkingIndicatorVariant
  text?: string
  size?: 'small' | 'default' | 'large'
  color?: ThinkingIndicatorColor
  ariaLabel?: string
}
