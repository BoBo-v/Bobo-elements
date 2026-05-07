import { useEffect, useCallback } from 'react'
import type { ModalProps } from '../../../core/components/modal.react.types'
import Icon from '../Icon'
import '../../../components/Modal/style.css'

export function Modal({
  visible,
  title,
  width = '520px',
  top = '15vh',
  closable = true,
  maskClosable = true,
  showFooter = true,
  children,
  footer,
  onClose,
  onConfirm,
  onCancel,
  onOpen,
}: ModalProps) {
  useEffect(() => {
    if (visible) {
      onOpen?.()
    }
  }, [visible])

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  const handleMaskClick = useCallback(() => {
    if (maskClosable) handleClose()
  }, [maskClosable, handleClose])

  const handleConfirm = useCallback(() => {
    onConfirm?.()
    handleClose()
  }, [onConfirm, handleClose])

  const handleCancel = useCallback(() => {
    onCancel?.()
    handleClose()
  }, [onCancel, handleClose])

  if (!visible) return null

  return (
    <div className="vk-overlay" onClick={handleMaskClick}>
      <div
        className="vk-modal"
        style={{ width, marginTop: top }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="vk-modal__header">
          <span className="vk-modal__title">{title}</span>
          {closable && (
            <button className="vk-modal__close" onClick={handleClose}>
              <Icon name="xmark" />
            </button>
          )}
        </div>
        <div className="vk-modal__body">{children}</div>
        {showFooter && (
          <div className="vk-modal__footer">
            {footer ?? (
              <>
                <button className="vk-button" onClick={handleCancel}>取消</button>
                <button className="vk-button vk-button--primary" onClick={handleConfirm}>确定</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
