export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error' | 'awaiting-approval'

export interface ToolCallProps {
  title: string
  toolName?: string
  status?: ToolCallStatus
  duration?: number
  expanded?: boolean
  defaultExpanded?: boolean
  args?: string | Record<string, unknown>
  result?: string | Record<string, unknown>
  errorMessage?: string
  approveText?: string
  rejectText?: string
  argsLabel?: string
  resultLabel?: string
}

export interface ToolCallEmits {
  (e: 'update:expanded', value: boolean): void
  (e: 'approve'): void
  (e: 'reject'): void
}
