export interface ModalProps {
  modelValue: boolean
  title?: string
  width?: string
  top?: string
  closable?: boolean
  maskClosable?: boolean
  showFooter?: boolean
}

export interface ModalEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}
