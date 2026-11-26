export type ReasoningBlockStatus = 'thinking' | 'done'

export interface ReasoningBlockProps {
  title?: string
  expanded?: boolean
  status?: ReasoningBlockStatus
  /** 思考完成（status 从 thinking 变为 done）时是否自动收起 */
  autoCollapse?: boolean
  duration?: number
  tokenCount?: number
  tokenUnit?: string
  onExpandedChange?: (expanded: boolean) => void
}

export interface ReasoningBlockEmits {
  (e: 'update:expanded', value: boolean): void
}
