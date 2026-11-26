import type { ToolCallStatus } from './tool-call.types'

/**
 * 格式化工具入参/出参为可读文本（对象安全序列化为缩进 JSON）
 */
export function formatToolPayload(payload?: string | Record<string, unknown>): string {
  if (payload === undefined || payload === null) return ''
  if (typeof payload === 'string') return payload
  try {
    return JSON.stringify(payload, null, 2)
  } catch {
    return String(payload)
  }
}

export const TOOL_STATUS_LABELS: Record<ToolCallStatus, string> = {
  pending: '等待执行',
  running: '执行中',
  success: '已完成',
  error: '执行失败',
  'awaiting-approval': '等待确认',
}
