import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StreamingText } from '../StreamingText'

describe('StreamingText component', () => {
  test('renders with empty text', () => {
    render(<StreamingText />)
    const el = screen.getByTestId('streaming-text')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('vk-streaming-text')
    expect(screen.getByTestId('streaming-text-content')).toHaveTextContent('')
    expect(screen.getByTestId('streaming-text-cursor')).toHaveTextContent('│')
  })

  test('shows cursor by default', () => {
    render(<StreamingText text="hello" />)
    expect(screen.getByTestId('streaming-text-cursor')).toBeInTheDocument()
  })

  test('hides cursor when showCursor is false', () => {
    render(<StreamingText text="hello" showCursor={false} />)
    expect(screen.queryByTestId('streaming-text-cursor')).toBeNull()
  })

  test('custom cursor char', () => {
    render(<StreamingText text="hi" cursorChar="|" />)
    expect(screen.getByTestId('streaming-text-cursor')).toHaveTextContent('|')
  })
})
