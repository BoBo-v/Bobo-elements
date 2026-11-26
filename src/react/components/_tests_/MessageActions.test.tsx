import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { MessageActions } from '../MessageActions'

describe('MessageActions component', () => {
  test('triggers regenerate, feedback toggle, and branch switch', () => {
    const onRegenerate = vi.fn()
    const onFeedback = vi.fn()
    const onBranchChange = vi.fn()
    render(
      <MessageActions
        content="hi"
        regenerable
        feedback="like"
        branchIndex={1}
        branchTotal={2}
        onRegenerate={onRegenerate}
        onFeedback={onFeedback}
        onBranchChange={onBranchChange}
      />
    )

    fireEvent.click(screen.getByTestId('message-actions-regenerate'))
    expect(onRegenerate).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByTestId('message-actions-like'))
    expect(onFeedback).toHaveBeenCalledWith(null)

    fireEvent.click(screen.getByTestId('message-actions-next'))
    expect(onBranchChange).toHaveBeenCalledWith(2)
  })
})
