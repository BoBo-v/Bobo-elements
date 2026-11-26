import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { ToolCall } from '../ToolCall'

describe('ToolCall component', () => {
  test('toggles payload details and triggers approve/reject', () => {
    const onApprove = vi.fn()
    const onReject = vi.fn()
    render(
      <ToolCall
        title="执行 SQL"
        toolName="run_sql"
        status="awaiting-approval"
        args={{ sql: 'SELECT 1' }}
        onApprove={onApprove}
        onReject={onReject}
      />
    )

    expect(screen.getByTestId('tool-call-status')).toHaveTextContent('等待确认')
    expect(screen.queryByTestId('tool-call-body')).toBeNull()

    fireEvent.click(screen.getByTestId('tool-call-header'))
    expect(screen.getByTestId('tool-call-args')).toHaveTextContent('SELECT 1')

    fireEvent.click(screen.getByTestId('tool-call-approve-btn'))
    fireEvent.click(screen.getByTestId('tool-call-reject-btn'))
    expect(onApprove).toHaveBeenCalledTimes(1)
    expect(onReject).toHaveBeenCalledTimes(1)
  })
})
