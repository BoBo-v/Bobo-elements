import type { AttachmentItem } from './attachment.types'

/**
 * 判断附件是否为可预览的图片类型
 */
export function isImageAttachment(item: AttachmentItem): boolean {
  if (!item.url) return false
  if (item.type && item.type.toLowerCase().startsWith('image/')) return true
  return /\.(png|jpe?g|gif|webp|bmp|avif)$/i.test(item.name)
}

/**
 * 根据 MIME 类型或后缀映射 FontAwesome 图标名
 */
export function getAttachmentIcon(item: AttachmentItem): string {
  const mime = (item.type || '').toLowerCase()
  const name = item.name.toLowerCase()
  if (mime.startsWith('image/') || /\.(png|jpe?g|gif|webp|bmp|avif)$/.test(name)) {
    return 'image'
  }
  if (mime === 'application/pdf' || name.endsWith('.pdf')) {
    return 'file-pdf'
  }
  if (/\.(ts|tsx|js|jsx|py|go|rs|java|cpp|c|vue|json|yaml|yml|md|sql|html|css)$/.test(name)) {
    return 'file-code'
  }
  return 'file-lines'
}
