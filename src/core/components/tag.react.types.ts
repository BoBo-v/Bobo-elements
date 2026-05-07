import type { ReactNode } from 'react'

export type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type TagSize = 'large' | 'default' | 'small'
export type TagEffect = 'dark' | 'light' | 'plain'

export interface TagProps {
  type?: TagType
  size?: TagSize
  effect?: TagEffect
  closable?: boolean
  round?: boolean
  color?: string
  children?: ReactNode
  onClose?: () => void
  onClick?: () => void
}
