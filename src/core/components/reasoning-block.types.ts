export interface ReasoningBlockProps {
  title?: string
  expanded?: boolean
  duration?: number
  tokenCount?: number
  onExpandedChange?: (expanded: boolean) => void
}
