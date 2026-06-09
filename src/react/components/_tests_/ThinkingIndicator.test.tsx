import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThinkingIndicator } from '../ThinkingIndicator'

describe('ThinkingIndicator component', () => {
  test('renders with dots variant by default', () => {
    render(<ThinkingIndicator />)
    const indicator = screen.getByTestId('thinking-indicator')
    expect(indicator).toBeInTheDocument()
    expect(indicator).toHaveClass('vk-thinking-indicator')
    expect(indicator).toHaveAttribute('role', 'status')
    expect(indicator).toHaveAttribute('aria-live', 'polite')
    expect(screen.getByTestId('thinking-indicator-dots')).toBeInTheDocument()
    expect(screen.getByText('正在思考...')).toBeInTheDocument()
  })

  test('renders pulse variant', () => {
    render(<ThinkingIndicator variant="pulse" />)
    expect(screen.getByTestId('thinking-indicator-pulse')).toBeInTheDocument()
    expect(screen.queryByTestId('thinking-indicator-dots')).toBeNull()
  })

  test('renders wave variant', () => {
    render(<ThinkingIndicator variant="wave" />)
    const wave = screen.getByTestId('thinking-indicator-wave')
    expect(wave).toBeInTheDocument()
    expect(wave.querySelectorAll('.vk-thinking-indicator__wave-bar')).toHaveLength(5)
  })

  test('renders custom text', () => {
    render(<ThinkingIndicator text="加载中..." />)
    expect(screen.getByText('加载中...')).toBeInTheDocument()
  })

  test('hides text when empty', () => {
    render(<ThinkingIndicator text="" />)
    expect(screen.queryByText('正在思考...')).toBeNull()
  })

  test('applies size class', () => {
    const { rerender } = render(<ThinkingIndicator size="small" />)
    expect(screen.getByTestId('thinking-indicator')).toHaveClass('vk-thinking-indicator--small')

    rerender(<ThinkingIndicator size="large" />)
    expect(screen.getByTestId('thinking-indicator')).toHaveClass('vk-thinking-indicator--large')

    rerender(<ThinkingIndicator size="default" />)
    expect(screen.getByTestId('thinking-indicator')).not.toHaveClass('vk-thinking-indicator--default')
  })

  test('custom aria-label', () => {
    render(<ThinkingIndicator ariaLabel="Loading" />)
    expect(screen.getByTestId('thinking-indicator')).toHaveAttribute('aria-label', 'Loading')
  })
})
