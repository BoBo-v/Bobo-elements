import { memo } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type {
  WelcomeProps as CoreWelcomeProps,
  WelcomeVariant,
  WelcomeAlign,
} from '../../../core/components/welcome.types'
import Icon from '../Icon'
import '../../../components/Welcome/style.css'

export type { WelcomeVariant, WelcomeAlign }

export interface WelcomeProps extends Omit<CoreWelcomeProps, 'title' | 'description' | 'icon'> {
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  extra?: ReactNode
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export const Welcome = memo(function Welcome({
  title,
  description,
  icon = 'sparkles',
  extra,
  variant = 'borderless',
  align = 'left',
  className,
  style,
  children,
}: WelcomeProps) {
  const rootClass = [
    'vk-welcome',
    `vk-welcome--${variant}`,
    align === 'center' ? 'vk-welcome--center' : '',
    className || '',
  ].filter(Boolean).join(' ')

  const renderIcon = () => {
    if (!icon) return null
    if (typeof icon === 'string') return <Icon name={icon} />
    return icon
  }

  return (
    <div className={rootClass} style={style} data-testid="welcome">
      {icon && (
        <div className="vk-welcome__icon" data-testid="welcome-icon">
          {renderIcon()}
        </div>
      )}
      <div className="vk-welcome__body">
        <div className="vk-welcome__header">
          <div>
            {title && (
              <h2 className="vk-welcome__title" data-testid="welcome-title">
                {title}
              </h2>
            )}
            {description && (
              <p className="vk-welcome__description" data-testid="welcome-description">
                {description}
              </p>
            )}
          </div>
          {extra && (
            <div className="vk-welcome__extra" data-testid="welcome-extra">
              {extra}
            </div>
          )}
        </div>
        {children && <div className="vk-welcome__footer">{children}</div>}
      </div>
    </div>
  )
})
