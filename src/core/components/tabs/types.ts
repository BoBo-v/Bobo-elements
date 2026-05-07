import type { InjectionKey } from 'vue'
import type { ReactNode } from 'react'

export type TabsType = 'line' | 'card'

export interface TabsProps {
  modelValue: string | number
  type?: TabsType
  children?: ReactNode
  onChange?: (name: string | number) => void
}

export interface TabPaneProps {
  name: string | number
  label: string
  disabled?: boolean
  children?: ReactNode
}

export interface TabsContext {
  activeName: string | number
  handleTabClick: (name: string | number) => void
}

export interface TabsEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('tabsContextKey')
