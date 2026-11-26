export type DiffLineType = 'unchanged' | 'added' | 'removed'

export interface DiffLine {
  type: DiffLineType
  content: string
  oldLine?: number
  newLine?: number
}

export interface DiffCodeBlockProps {
  oldCode?: string
  newCode?: string
  language?: string
  title?: string
  theme?: 'dark' | 'light'
  showLineNumbers?: boolean
  actionable?: boolean
  applyText?: string
  rejectText?: string
}

export interface DiffCodeBlockEmits {
  (e: 'apply', newCode: string): void
  (e: 'reject'): void
}
