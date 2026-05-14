import { render, screen, fireEvent } from '@testing-library/react'
import { Tag } from '../Tag'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

describe('Tag component', () => {
  test('renders with type class', () => {
    const { container } = render(<Tag type="success">标签</Tag>)
    const tag = container.querySelector('.vk-tag')
    expect(tag).not.toBeNull()
    expect(tag!.classList.contains('vk-tag--success')).toBe(true)
    expect(screen.getByText('标签')).toBeInTheDocument()
  })

  test('renders with effect', () => {
    const { container } = render(<Tag type="primary" effect="dark">标签</Tag>)
    const tag = container.querySelector('.vk-tag')
    expect(tag!.classList.contains('vk-tag--dark')).toBe(true)
  })

  test('renders with size', () => {
    const { container } = render(<Tag type="primary" size="large">标签</Tag>)
    const tag = container.querySelector('.vk-tag')
    expect(tag!.classList.contains('vk-tag--large')).toBe(true)
  })

  test('renders round tag', () => {
    const { container } = render(<Tag type="primary" round>标签</Tag>)
    const tag = container.querySelector('.vk-tag')
    expect(tag!.classList.contains('is-round')).toBe(true)
  })

  test('closable tag hides and calls onClose', () => {
    const onClose = vi.fn()
    const { container } = render(<Tag type="primary" closable onClose={onClose}>标签</Tag>)
    const closeBtn = container.querySelector('.vk-tag__close')!
    fireEvent.click(closeBtn)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(container.querySelector('.vk-tag')).toBeNull()
  })

  test('non-closable tag does not render close button', () => {
    const { container } = render(<Tag type="primary">标签</Tag>)
    expect(container.querySelector('.vk-tag__close')).toBeNull()
  })

  test('calls onClick', () => {
    const onClick = vi.fn()
    render(<Tag type="primary" onClick={onClick}>标签</Tag>)
    fireEvent.click(screen.getByText('标签'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('custom color applies inline style', () => {
    const { container } = render(<Tag type="primary" color="#ff0000">标签</Tag>)
    const tag = container.querySelector('.vk-tag') as HTMLElement
    expect(tag.style.backgroundColor).toBe('rgb(255, 0, 0)')
  })
})
