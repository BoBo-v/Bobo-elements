import { memo, useContext, createContext } from 'react'
import type { RadioProps, RadioGroupProps, RadioGroupContext, RadioValueType } from '../../../core/components/radio/types'
import '../../../components/Radio/style.css'

const RadioGroupContextReact = createContext<RadioGroupContext | null>(null)

export function RadioGroup({
  modelValue,
  disabled,
  name,
  size,
  children,
  onChange,
}: RadioGroupProps) {
  const handleChange = (value: RadioValueType) => {
    onChange?.(value)
  }

  return (
    <RadioGroupContextReact.Provider value={{ modelValue, disabled, name, size, handleChange }}>
      <div className="vk-radio-group">{children}</div>
    </RadioGroupContextReact.Provider>
  )
}

export const Radio = memo(function Radio({
  value,
  label,
  disabled,
  name,
  size,
  modelValue,
  children,
}: RadioProps & { onChange?: (value: RadioValueType) => void }) {
  const group = useContext(RadioGroupContextReact)

  const isChecked = group ? group.modelValue === value : modelValue === value
  const isDisabled = group?.disabled || disabled
  const actualSize = group?.size || size || 'default'
  const actualName = group?.name || name

  const handleChange = () => {
    if (isDisabled) return
    if (group) {
      group.handleChange(value)
    }
  }

  const classes = [
    'vk-radio',
    isChecked ? 'is-checked' : '',
    isDisabled ? 'is-disabled' : '',
    actualSize !== 'default' ? `vk-radio--${actualSize}` : '',
  ].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      <input
        className="vk-radio__input"
        type="radio"
        name={actualName}
        value={String(value)}
        disabled={isDisabled}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="vk-radio__inner" />
      <span className="vk-radio__label">{children ?? label}</span>
    </label>
  )
})
