import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { DiffCodeBlock } from '../DiffCodeBlock'

describe('DiffCodeBlock component', () => {
  test('renders diff stats and handles apply/reject', () => {
    const onApply = vi.fn()
    const onReject = vi.fn()
    render(
      <DiffCodeBlock
        title="index.ts"
        oldCode={'line1\nold'}
        newCode={'line1\nnew'}
        actionable
        onApply={onApply}
        onReject={onReject}
      />
    )
    expect(screen.getAllByTestId('diff-code-line')).toHaveLength(3)
    fireEvent.click(screen.getByTestId('diff-apply-btn'))
    expect(onApply).toHaveBeenCalledWith('line1\nnew')
    fireEvent.click(screen.getByTestId('diff-reject-btn'))
    expect(onReject).toHaveBeenCalledTimes(1)
  })
})
