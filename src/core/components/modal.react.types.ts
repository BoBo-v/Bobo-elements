import type { ReactNode } from 'react'

export interface ModalProps {
  visible: boolean
  title?: string
  width?: string
  top?: string
  closable?: boolean
  maskClosable?: boolean
  showFooter?: boolean
  children?: ReactNode
  footer?: ReactNode
  onClose?: () => void
  onConfirm?: () => void
  onCancel?: () => void
  onOpen?: () => void
}
