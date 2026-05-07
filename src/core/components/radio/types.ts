import type { InjectionKey } from 'vue'
import type { ReactNode } from 'react'

export type RadioValueType = string | number | boolean

export interface RadioProps {
  modelValue?: RadioValueType
  value: RadioValueType
  label?: string
  disabled?: boolean
  name?: string
  size?: 'large' | 'default' | 'small'
  children?: ReactNode
}

export interface RadioGroupProps {
  modelValue: RadioValueType
  disabled?: boolean
  name?: string
  size?: 'large' | 'default' | 'small'
  children?: ReactNode
  onChange?: (value: RadioValueType) => void
}

export interface RadioGroupContext {
  modelValue: RadioValueType
  name?: string
  disabled?: boolean
  size?: 'large' | 'default' | 'small'
  handleChange: (value: RadioValueType) => void
}

export interface RadioEmits {
  (e: 'update:modelValue', value: RadioValueType): void
  (e: 'change', value: RadioValueType): void
}

export interface RadioGroupEmits {
  (e: 'update:modelValue', value: RadioValueType): void
  (e: 'change', value: RadioValueType): void
}

export const radioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupContextKey')
