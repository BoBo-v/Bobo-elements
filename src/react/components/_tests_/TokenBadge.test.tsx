import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TokenBadge } from '../TokenBadge'

describe('TokenBadge component', () => {
  test('basic render', () => {
    render(<TokenBadge />)
    const badge = screen.getByTestId('token-badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('vk-token-badge--normal')
    expect(screen.getByTestId('token-badge-value')).toHaveTextContent('0')
    expect(screen.getByText('Tokens')).toBeInTheDocument()
  })

  test('shows used value', () => {
    render(<TokenBadge used={1200} />)
    expect(screen.getByTestId('token-badge-value')).toHaveTextContent('1.2K')
  })

  test('shows total when provided', () => {
    render(<TokenBadge used={500} total={4000} />)
    expect(screen.getByTestId('token-badge-total')).toHaveTextContent('/ 4.0K')
  })

  test('hides total when not provided', () => {
    render(<TokenBadge used={500} />)
    expect(screen.queryByTestId('token-badge-total')).toBeNull()
  })

  test('status variants', () => {
    const { rerender } = render(<TokenBadge status="warning" />)
    expect(screen.getByTestId('token-badge')).toHaveClass('vk-token-badge--warning')

    rerender(<TokenBadge status="danger" />)
    expect(screen.getByTestId('token-badge')).toHaveClass('vk-token-badge--danger')
  })

  test('custom prefix', () => {
    render(<TokenBadge prefix="字符" />)
    expect(screen.getByText('字符')).toBeInTheDocument()
  })

  test('can derive status from token ratio', () => {
    render(<TokenBadge used={4000} total={4000} autoStatus />)
    expect(screen.getByTestId('token-badge')).toHaveClass('vk-token-badge--danger')
  })
})
