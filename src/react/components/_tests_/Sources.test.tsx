import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { Sources } from '../Sources'

describe('Sources component', () => {
  const items = [
    { id: 1, title: 'React Docs', url: 'https://react.dev', domain: 'react.dev', snippet: 'UI library' },
    { id: 2, title: 'Unsafe Link', url: 'javascript:alert(1)' },
  ]

  test('toggles list, sanitizes links, and calls onSelect', () => {
    const onSelect = vi.fn()
    render(<Sources items={items} variant="cards" onSelect={onSelect} />)

    expect(screen.getByTestId('sources-toggle')).toHaveTextContent('参考来源 (2)')
    expect(screen.queryByTestId('sources-list')).toBeNull()

    fireEvent.click(screen.getByTestId('sources-toggle'))
    const rendered = screen.getAllByTestId('sources-item')
    expect(rendered).toHaveLength(2)
    expect(rendered[0].tagName).toBe('A')
    expect(rendered[1].tagName).toBe('DIV')

    fireEvent.click(rendered[0])
    expect(onSelect).toHaveBeenCalledWith(items[0])
  })
})
