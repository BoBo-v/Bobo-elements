export type FeedbackValue = 'like' | 'dislike' | null

export interface MessageActionsProps {
  content?: string
  copyable?: boolean
  regenerable?: boolean
  editable?: boolean
  feedbackable?: boolean
  feedback?: FeedbackValue
  branchIndex?: number
  branchTotal?: number
  copyText?: string
  copiedText?: string
  regenerateText?: string
  editText?: string
}

export interface MessageActionsEmits {
  (e: 'copy', content: string): void
  (e: 'regenerate'): void
  (e: 'edit'): void
  (e: 'feedback', value: FeedbackValue): void
  (e: 'branch-change', index: number): void
}
