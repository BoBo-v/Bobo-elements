import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs, TabPane } from '../Tabs'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

const renderTabs = (props = {}) => {
  return render(
    <Tabs modelValue="first" {...props}>
      <TabPane name="first" label="标签一">内容一</TabPane>
      <TabPane name="second" label="标签二">内容二</TabPane>
      <TabPane name="third" label="标签三" disabled>内容三</TabPane>
    </Tabs>
  )
}

describe('Tabs component', () => {
  test('renders tab headers', () => {
    renderTabs()
    expect(screen.getByText('标签一')).toBeInTheDocument()
    expect(screen.getByText('标签二')).toBeInTheDocument()
    expect(screen.getByText('标签三')).toBeInTheDocument()
  })

  test('shows only active pane content', () => {
    renderTabs()
    expect(screen.getByText('内容一')).toBeInTheDocument()
    expect(screen.queryByText('内容二')).toBeNull()
  })

  test('marks active tab', () => {
    const { container } = renderTabs()
    const items = container.querySelectorAll('.vk-tabs__item')
    expect(items[0].classList.contains('is-active')).toBe(true)
    expect(items[1].classList.contains('is-active')).toBe(false)
  })

  test('marks disabled tab', () => {
    const { container } = renderTabs()
    const items = container.querySelectorAll('.vk-tabs__item')
    expect(items[2].classList.contains('is-disabled')).toBe(true)
  })

  test('calls onChange when tab clicked', () => {
    const onChange = vi.fn()
    const { container } = renderTabs({ onChange })
    const items = container.querySelectorAll('.vk-tabs__item')
    fireEvent.click(items[1])
    expect(onChange).toHaveBeenCalledWith('second')
  })

  test('does not call onChange when disabled tab clicked', () => {
    const onChange = vi.fn()
    const { container } = renderTabs({ onChange })
    const items = container.querySelectorAll('.vk-tabs__item')
    fireEvent.click(items[2])
    expect(onChange).not.toHaveBeenCalled()
  })

  test('renders card type', () => {
    const { container } = renderTabs({ type: 'card' })
    expect(container.querySelector('.vk-tabs--card')).not.toBeNull()
  })
})
