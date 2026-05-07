import { useState, memo } from 'react'
import type { TagProps } from '../../../core/components/tag.react.types'
import Icon from '../Icon'
import '../../../components/Tag/style.css'

export const Tag = memo(function Tag({
  type = 'primary',
  size = 'default',
  effect = 'light',
  closable = false,
  round = false,
  color,
  children,
  onClose,
  onClick,
}: TagProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const classes = [
    'vk-tag',
    type ? `vk-tag--${type}` : '',
    size !== 'default' ? `vk-tag--${size}` : '',
    effect ? `vk-tag--${effect}` : '',
    round ? 'is-round' : '',
  ].filter(Boolean).join(' ')

  const style = color
    ? { backgroundColor: color, borderColor: color, color: '#fff' }
    : undefined

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setVisible(false)
    onClose?.()
  }

  return (
    <span className={classes} style={style} onClick={onClick}>
      <span className="vk-tag__content">{children}</span>
      {closable && (
        <button className="vk-tag__close" onClick={handleClose}>
          <Icon name="xmark" />
        </button>
      )}
    </span>
  )
})
