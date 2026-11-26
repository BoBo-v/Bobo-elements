export type AttachmentStatus = 'uploading' | 'done' | 'error'
export type AttachmentListLayout = 'horizontal' | 'grid'

export interface AttachmentItem {
  id: string
  name: string
  size?: number
  type?: string
  url?: string
  status?: AttachmentStatus
  progress?: number
  errorMessage?: string
}

export interface AttachmentProps {
  items?: AttachmentItem[]
  layout?: AttachmentListLayout
  removable?: boolean
  clickable?: boolean
  removeAriaLabel?: string
  retryText?: string
}

export interface AttachmentEmits {
  (e: 'remove', item: AttachmentItem): void
  (e: 'click', item: AttachmentItem): void
  (e: 'retry', item: AttachmentItem): void
}
