export type ModelSelectorSize = 'small' | 'default' | 'large'

export interface ModelOption {
  id: string
  name: string
  provider?: string
  contextLength?: string
  tags?: string[]
  description?: string
  icon?: string
  disabled?: boolean
}

export interface ModelSelectorProps {
  modelValue?: string
  models?: ModelOption[]
  placeholder?: string
  disabled?: boolean
  size?: ModelSelectorSize
}

export interface ModelSelectorEmits {
  (e: 'update:modelValue', id: string): void
  (e: 'change', model: ModelOption): void
}
