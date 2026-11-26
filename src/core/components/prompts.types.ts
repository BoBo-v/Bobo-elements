export type PromptsLayout = 'grid' | 'horizontal' | 'vertical'
export type PromptsVariant = 'card' | 'pill'

export interface PromptItem {
  key: string
  label: string
  description?: string
  icon?: string
  disabled?: boolean
}

export interface PromptsProps {
  title?: string
  items?: PromptItem[]
  layout?: PromptsLayout
  variant?: PromptsVariant
  wrap?: boolean
}

export interface PromptsEmits {
  (e: 'select', item: PromptItem): void
}
