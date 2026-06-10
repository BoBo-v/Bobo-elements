import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { ChatMessage } from '../ChatMessage'

describe('ChatMessage component', () => {
  test('renders user message', () => {
    render(<ChatMessage role="user">Hello</ChatMessage>)
    expect(screen.getByTestId('chat-message')).toHaveClass('vk-chat-message--user')
    expect(screen.getByTestId('chat-message-bubble')).toHaveTextContent('Hello')
  })

  test('renders assistant message', () => {
    render(<ChatMessage role="assistant">Hi</ChatMessage>)
    expect(screen.getByTestId('chat-message')).toHaveClass('vk-chat-message--assistant')
  })

  test('renders system message', () => {
    render(<ChatMessage role="system">System</ChatMessage>)
    expect(screen.getByTestId('chat-message')).toHaveClass('vk-chat-message--system')
  })

  test('shows avatar by default', () => {
    render(<ChatMessage role="user">text</ChatMessage>)
    expect(screen.getByTestId('chat-message-avatar')).toBeInTheDocument()
  })

  test('hides avatar', () => {
    render(<ChatMessage role="user" showAvatar={false}>text</ChatMessage>)
    expect(screen.queryByTestId('chat-message-avatar')).toBeNull()
  })

  test('shows timestamp', () => {
    render(<ChatMessage role="user" timestamp="2024-01-01T12:30:00">text</ChatMessage>)
    expect(screen.getByTestId('chat-message-timestamp')).toBeInTheDocument()
  })

  test('shows error with retry', () => {
    const onRetry = vi.fn()
    render(<ChatMessage role="assistant" status="error" onRetry={onRetry}>text</ChatMessage>)
    expect(screen.getByTestId('chat-message-error')).toHaveTextContent('发送失败')
    fireEvent.click(screen.getByTestId('chat-message-retry'))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  test('copies copyContent when provided', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    render(<ChatMessage role="assistant" copyable copyContent="copy me">Rendered content</ChatMessage>)
    fireEvent.click(screen.getByTestId('chat-message-copy-btn'))
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('copy me'))
  })
})
