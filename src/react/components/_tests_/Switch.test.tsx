import { render, fireEvent } from '@testing-library/react'
import Switch from '../Switch'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

describe('Switch component', () => {
  test('renders switch with role="switch" and aria-checked', () => {
    const { container } = render(<Switch modelValue={false} />)
    const root = container.querySelector('.vk-switch')!
    const btn = container.querySelector('button.vk-switch__core')!
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('role', 'switch')
    expect(btn).toHaveAttribute('aria-checked', 'false')
    expect(root.classList.contains('is-checked')).toBe(false)
  })

  test('calls onChange with toggled value on click', () => {
    const onChange = vi.fn()
    const { container } = render(<Switch modelValue={false} onChange={onChange} />)
    const btn = container.querySelector('button.vk-switch__core')!
    fireEvent.click(btn)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  test('supports custom activeValue and inactiveValue', () => {
    const onChange = vi.fn()
    const { container } = render(
      <Switch
        modelValue="yes"
        activeValue="yes"
        inactiveValue="no"
        onChange={onChange}
      />
    )
    const root = container.querySelector('.vk-switch')!
    expect(root.classList.contains('is-checked')).toBe(true)
    fireEvent.click(container.querySelector('button.vk-switch__core')!)
    expect(onChange).toHaveBeenCalledWith('no')
  })

  test('disabled switch prevents onChange', () => {
    const onChange = vi.fn()
    const { container } = render(<Switch modelValue={false} disabled onChange={onChange} />)
    const root = container.querySelector('.vk-switch')!
    const btn = container.querySelector('button.vk-switch__core')!
    expect(root.classList.contains('is-disabled')).toBe(true)
    expect(btn).toBeDisabled()
    fireEvent.click(btn)
    expect(onChange).not.toHaveBeenCalled()
  })

  test('renders size classes and active/inactive text', () => {
    const { container, rerender } = render(
      <Switch modelValue={false} size="large" activeText="ON" inactiveText="OFF" />
    )
    expect(container.querySelector('.vk-switch')!.classList.contains('vk-switch--large')).toBe(true)
    expect(container.querySelector('.vk-switch__core-inner-text')!.textContent).toBe('OFF')

    rerender(<Switch modelValue={true} size="small" activeText="ON" inactiveText="OFF" />)
    expect(container.querySelector('.vk-switch')!.classList.contains('vk-switch--small')).toBe(true)
    expect(container.querySelector('.vk-switch__core-inner-text')!.textContent).toBe('ON')
  })

  test('renders hidden input when name is provided', () => {
    const { container } = render(<Switch modelValue={true} name="agree" id="agree-id" />)
    const input = container.querySelector('input.vk-switch__input')!
    const btn = container.querySelector('button.vk-switch__core')!
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('name', 'agree')
    expect(input).toHaveAttribute('value', 'true')
    expect(btn).toHaveAttribute('id', 'agree-id')
  })
})
