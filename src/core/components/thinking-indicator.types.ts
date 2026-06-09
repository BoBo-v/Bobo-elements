export type ThinkingIndicatorVariant = 'dots' | 'pulse' | 'wave'

export interface ThinkingIndicatorProps {
  variant?: ThinkingIndicatorVariant
  text?: string
  size?: 'small' | 'default' | 'large'
  ariaLabel?: string
}
