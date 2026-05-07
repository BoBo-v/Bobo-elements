import type { InjectionKey } from 'vue'
import type { ReactNode } from 'react'

export type CheckboxValueType = string | number | boolean

export interface CheckboxProps {
  modelValue?: boolean
  value?: CheckboxValueType
  label?: string
  disabled?: boolean
  checked?: boolean
  name?: string
  children?: ReactNode
}

export interface CheckboxGroupProps {
  modelValue: CheckboxValueType[]
  disabled?: boolean
  min?: number
  max?: number
  children?: ReactNode
  onChange?: (value: CheckboxValueType[]) => void
}

export interface CheckboxGroupContext {
  modelValue: CheckboxValueType[]
  disabled?: boolean
  min?: number
  max?: number
  handleChange: (value: CheckboxValueType, checked: boolean) => void
}

export interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

export interface CheckboxGroupEmits {
  (e: 'update:modelValue', value: CheckboxValueType[]): void
  (e: 'change', value: CheckboxValueType[]): void
}

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupContextKey')
