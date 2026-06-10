import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { PromptInput } from '../PromptInput'

describe('PromptInput component', () => {
  test('basic render', () => {
    render(<PromptInput />)
    expect(screen.getByTestId('prompt-input')).toBeInTheDocument()
    expect(screen.getByTestId('prompt-input-textarea')).toBeInTheDocument()
    expect(screen.getByTestId('prompt-input-send-btn')).toBeInTheDocument()
  })

  test('shows placeholder', () => {
    render(<PromptInput placeholder="Ask me..." />)
    expect(screen.getByTestId('prompt-input-textarea')).toHaveAttribute('placeholder', 'Ask me...')
  })

  test('disabled state', () => {
    render(<PromptInput disabled />)
    expect(screen.getByTestId('prompt-input')).toHaveClass('is-disabled')
    expect(screen.getByTestId('prompt-input-textarea')).toBeDisabled()
  })

  test('streaming state', () => {
    render(<PromptInput streaming />)
    expect(screen.getByTestId('prompt-input')).toHaveClass('is-streaming')
    expect(screen.getByText('AI 正在回复...')).toBeInTheDocument()
    expect(screen.getByTestId('prompt-input-send-btn')).toBeDisabled()
  })

  test('calls onChange on input', () => {
    const onChange = vi.fn()
    render(<PromptInput onChange={onChange} />)
    fireEvent.change(screen.getByTestId('prompt-input-textarea'), { target: { value: 'hi' } })
    expect(onChange).toHaveBeenCalledWith('hi')
  })

  test('calls onSubmit on Enter', () => {
    const onSubmit = vi.fn()
    render(<PromptInput value="hello" onSubmit={onSubmit} />)
    fireEvent.keyDown(screen.getByTestId('prompt-input-textarea'), { key: 'Enter' })
    expect(onSubmit).toHaveBeenCalledWith('hello')
  })

  test('does not call onSubmit on Shift+Enter', () => {
    const onSubmit = vi.fn()
    render(<PromptInput value="hello" onSubmit={onSubmit} />)
    fireEvent.keyDown(screen.getByTestId('prompt-input-textarea'), { key: 'Enter', shiftKey: true })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('does not submit while composing text', () => {
    const onSubmit = vi.fn()
    render(<PromptInput value="你好" onSubmit={onSubmit} />)
    const textarea = screen.getByTestId('prompt-input-textarea')
    fireEvent.compositionStart(textarea)
    fireEvent.keyDown(textarea, { key: 'Enter' })
    expect(onSubmit).not.toHaveBeenCalled()
    fireEvent.compositionEnd(textarea)
    fireEvent.keyDown(textarea, { key: 'Enter' })
    expect(onSubmit).toHaveBeenCalledWith('你好')
  })

  test('calls onStop when stop button is clicked', () => {
    const onStop = vi.fn()
    render(<PromptInput streaming stopable onStop={onStop} />)
    fireEvent.click(screen.getByTestId('prompt-input-stop-btn'))
    expect(onStop).toHaveBeenCalledTimes(1)
  })

  test('shows count', () => {
    render(<PromptInput value="hello" showCount maxLength={100} />)
    expect(screen.getByText('5 / 100')).toBeInTheDocument()
  })
})
