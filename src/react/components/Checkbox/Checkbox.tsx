import { memo, useContext, createContext } from 'react'
import type { CheckboxProps, CheckboxGroupProps, CheckboxGroupContext, CheckboxValueType } from '../../../core/components/checkbox/types'
import '../../../components/Checkbox/style.css'

const CheckboxGroupContextReact = createContext<CheckboxGroupContext | null>(null)

export function CheckboxGroup({
  modelValue,
  disabled,
  min,
  max,
  children,
  onChange,
}: CheckboxGroupProps) {
  const handleChange = (value: CheckboxValueType, checked: boolean) => {
    const newVal = [...modelValue]
    if (checked) {
      if (max !== undefined && newVal.length >= max) return
      newVal.push(value)
    } else {
      if (min !== undefined && newVal.length <= min) return
      const idx = newVal.indexOf(value)
      if (idx > -1) newVal.splice(idx, 1)
    }
    onChange?.(newVal)
  }

  return (
    <CheckboxGroupContextReact.Provider value={{ modelValue, disabled, min, max, handleChange }}>
      <div className="vk-checkbox-group">{children}</div>
    </CheckboxGroupContextReact.Provider>
  )
}

export const Checkbox = memo(function Checkbox({
  value,
  label,
  disabled,
  checked,
  name,
  modelValue,
  children,
}: CheckboxProps & { onChange?: (checked: boolean) => void }) {
  const group = useContext(CheckboxGroupContextReact)

  const isChecked = group && value !== undefined
    ? group.modelValue.includes(value)
    : (modelValue ?? checked ?? false)

  const isDisabled = (() => {
    if (group) {
      if (group.disabled) return true
      if (!isChecked && group.max !== undefined && group.modelValue.length >= group.max) return true
      if (isChecked && group.min !== undefined && group.modelValue.length <= group.min) return true
    }
    return disabled ?? false
  })()

  const handleChange = () => {
    if (isDisabled) return
    if (group && value !== undefined) {
      group.handleChange(value, !isChecked)
    }
  }

  const classes = [
    'vk-checkbox',
    isChecked ? 'is-checked' : '',
    isDisabled ? 'is-disabled' : '',
  ].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      <input
        className="vk-checkbox__input"
        type="checkbox"
        name={name}
        disabled={isDisabled}
        checked={!!isChecked}
        onChange={handleChange}
      />
      <span className="vk-checkbox__inner" />
      <span className="vk-checkbox__label">{children ?? label}</span>
    </label>
  )
})
