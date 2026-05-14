import { render, fireEvent } from '@testing-library/react'
import { Radio, RadioGroup } from '../Radio'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

const renderRadioGroup = (props = {}) => {
  return render(
    <RadioGroup modelValue="1" {...props}>
      <Radio value="1">选项一</Radio>
      <Radio value="2">选项二</Radio>
      <Radio value="3">选项三</Radio>
    </RadioGroup>
  )
}

describe('Radio component', () => {
  test('renders correct number of radios', () => {
    const { container } = renderRadioGroup()
    const radios = container.querySelectorAll('.vk-radio')
    expect(radios.length).toBe(3)
  })

  test('checked radio has is-checked class', () => {
    const { container } = renderRadioGroup({ modelValue: '2' })
    const radios = container.querySelectorAll('.vk-radio')
    expect(radios[0].classList.contains('is-checked')).toBe(false)
    expect(radios[1].classList.contains('is-checked')).toBe(true)
    expect(radios[2].classList.contains('is-checked')).toBe(false)
  })

  test('calls onChange when radio clicked', () => {
    const onChange = vi.fn()
    const { container } = renderRadioGroup({ onChange })
    const inputs = container.querySelectorAll('.vk-radio__input')
    fireEvent.click(inputs[1])
    expect(onChange).toHaveBeenCalledWith('2')
  })

  test('disabled group adds is-disabled class', () => {
    const { container } = renderRadioGroup({ disabled: true })
    const radios = container.querySelectorAll('.vk-radio')
    radios.forEach(radio => {
      expect(radio.classList.contains('is-disabled')).toBe(true)
    })
  })

  test('disabled group inputs are disabled', () => {
    const { container } = renderRadioGroup({ disabled: true })
    const inputs = container.querySelectorAll('.vk-radio__input')
    inputs.forEach(input => {
      expect(input).toBeDisabled()
    })
  })

  test('renders label text', () => {
    const { container } = renderRadioGroup()
    const labels = container.querySelectorAll('.vk-radio__label')
    expect(labels[0].textContent).toBe('选项一')
    expect(labels[1].textContent).toBe('选项二')
  })
})
