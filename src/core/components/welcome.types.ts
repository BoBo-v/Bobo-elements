export type WelcomeVariant = 'borderless' | 'filled'
export type WelcomeAlign = 'left' | 'center'

export interface WelcomeProps {
  title?: string
  description?: string
  icon?: string
  variant?: WelcomeVariant
  align?: WelcomeAlign
}
