import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { Attachment } from '../Attachment'

describe('Attachment component', () => {
  const items = [
    { id: '1', name: 'photo.jpg', size: 2048, url: 'https://example.com/photo.jpg', status: 'done' as const },
    { id: '2', name: 'spec.pdf', status: 'uploading' as const, progress: 40 },
    { id: '3', name: 'broken.json', status: 'error' as const, errorMessage: '失败' },
  ]

  test('renders cards and triggers remove / retry / click', () => {
    const onRemove = vi.fn()
    const onRetry = vi.fn()
    const onClick = vi.fn()
    render(<Attachment items={items} clickable onRemove={onRemove} onRetry={onRetry} onClick={onClick} />)

    const cards = screen.getAllByTestId('attachment-card')
    expect(cards).toHaveLength(3)
    expect(screen.getByTestId('attachment-progress')).toBeInTheDocument()

    fireEvent.click(cards[0])
    expect(onClick).toHaveBeenCalledWith(items[0])

    fireEvent.click(screen.getAllByTestId('attachment-remove-btn')[0])
    expect(onRemove).toHaveBeenCalledWith(items[0])

    fireEvent.click(screen.getByTestId('attachment-retry-btn'))
    expect(onRetry).toHaveBeenCalledWith(items[2])
  })
})
