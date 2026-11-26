import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { Prompts } from '../Prompts'

describe('Prompts component', () => {
  const items = [
    { key: '1', label: '总结这段代码', description: '生成摘要' },
    { key: '2', label: '禁用提示', disabled: true },
  ]

  test('renders items and handles onSelect', () => {
    const onSelect = vi.fn()
    render(<Prompts title="推荐问题" items={items} onSelect={onSelect} />)
    expect(screen.getByTestId('prompts-title')).toHaveTextContent('推荐问题')
    const buttons = screen.getAllByTestId('prompts-item')
    expect(buttons).toHaveLength(2)
    fireEvent.click(buttons[0])
    expect(onSelect).toHaveBeenCalledWith(items[0])
    fireEvent.click(buttons[1])
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
