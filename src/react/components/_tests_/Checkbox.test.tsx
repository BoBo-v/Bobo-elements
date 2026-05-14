import { render, fireEvent } from '@testing-library/react'
import { Checkbox, CheckboxGroup } from '../Checkbox'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

const renderCheckboxGroup = (props = {}) => {
  return render(
    <CheckboxGroup modelValue={['上海', '北京']} {...props}>
      <Checkbox value="上海">上海</Checkbox>
      <Checkbox value="北京">北京</Checkbox>
      <Checkbox value="广州">广州</Checkbox>
      <Checkbox value="深圳">深圳</Checkbox>
    </CheckboxGroup>
  )
}

describe('Checkbox component', () => {
  test('renders correct number of checkboxes', () => {
    const { container } = renderCheckboxGroup()
    const checkboxes = container.querySelectorAll('.vk-checkbox')
    expect(checkboxes.length).toBe(4)
  })

  test('checked checkboxes have is-checked class', () => {
    const { container } = renderCheckboxGroup()
    const checkboxes = container.querySelectorAll('.vk-checkbox')
    expect(checkboxes[0].classList.contains('is-checked')).toBe(true)
    expect(checkboxes[1].classList.contains('is-checked')).toBe(true)
    expect(checkboxes[2].classList.contains('is-checked')).toBe(false)
    expect(checkboxes[3].classList.contains('is-checked')).toBe(false)
  })

  test('calls onChange when unchecked checkbox clicked', () => {
    const onChange = vi.fn()
    const { container } = renderCheckboxGroup({ onChange })
    const inputs = container.querySelectorAll('.vk-checkbox__input')
    fireEvent.click(inputs[2])
    expect(onChange).toHaveBeenCalledWith(expect.arrayContaining(['上海', '北京', '广州']))
  })

  test('calls onChange when checked checkbox unchecked', () => {
    const onChange = vi.fn()
    const { container } = renderCheckboxGroup({ onChange })
    const inputs = container.querySelectorAll('.vk-checkbox__input')
    fireEvent.click(inputs[0])
    const result = onChange.mock.calls[0][0]
    expect(result).not.toContain('上海')
    expect(result).toContain('北京')
  })

  test('disabled group adds is-disabled class', () => {
    const { container } = renderCheckboxGroup({ disabled: true })
    const checkboxes = container.querySelectorAll('.vk-checkbox')
    checkboxes.forEach(cb => {
      expect(cb.classList.contains('is-disabled')).toBe(true)
    })
  })

  test('max limit disables unchecked items', () => {
    const { container } = renderCheckboxGroup({ max: 2 })
    const checkboxes = container.querySelectorAll('.vk-checkbox')
    expect(checkboxes[2].classList.contains('is-disabled')).toBe(true)
    expect(checkboxes[3].classList.contains('is-disabled')).toBe(true)
  })

  test('min limit disables checked items', () => {
    const { container } = renderCheckboxGroup({ min: 2 })
    const checkboxes = container.querySelectorAll('.vk-checkbox')
    expect(checkboxes[0].classList.contains('is-disabled')).toBe(true)
    expect(checkboxes[1].classList.contains('is-disabled')).toBe(true)
  })

  test('renders label text', () => {
    const { container } = renderCheckboxGroup()
    const labels = container.querySelectorAll('.vk-checkbox__label')
    expect(labels[0].textContent).toBe('上海')
    expect(labels[1].textContent).toBe('北京')
  })
})
