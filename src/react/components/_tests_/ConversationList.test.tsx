import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConversationList } from '../ConversationList'
import type { ConversationListRef } from '../../../core/components/conversation-list.react.types'

describe('ConversationList component', () => {
  test('basic render', () => {
    render(<ConversationList>content</ConversationList>)
    const list = screen.getByTestId('conversation-list')
    expect(list).toBeInTheDocument()
    expect(list).toHaveClass('vk-conversation-list')
    expect(list).toHaveAttribute('role', 'log')
  })

  test('shows empty when no children', () => {
    render(<ConversationList />)
    expect(screen.getByTestId('conversation-list-empty')).toHaveTextContent('暂无对话')
  })

  test('custom empty text', () => {
    render(<ConversationList emptyText="No messages" />)
    expect(screen.getByText('No messages')).toBeInTheDocument()
  })

  test('shows loading indicator', () => {
    render(<ConversationList loadingMore>content</ConversationList>)
    expect(screen.getByTestId('conversation-list-loading')).toBeInTheDocument()
  })

  test('applies max height', () => {
    render(<ConversationList maxHeight="500px">content</ConversationList>)
    expect(screen.getByTestId('conversation-list')).toHaveStyle({ maxHeight: '500px' })
  })

  test('exposes scroll helpers', () => {
    const ref = createRef<ConversationListRef>()
    render(<ConversationList ref={ref}>content</ConversationList>)
    expect(ref.current?.scrollToBottom).toBeDefined()
    expect(ref.current?.getElement()).toBe(screen.getByTestId('conversation-list'))
  })
})
