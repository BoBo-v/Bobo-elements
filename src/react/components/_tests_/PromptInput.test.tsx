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

  test('does not trigger onSubmit if onKeyDown calls preventDefault', () => {
    const onSubmit = vi.fn()
    const onKeyDown = vi.fn((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault()
    })
    render(<PromptInput value="hello" onSubmit={onSubmit} onKeyDown={onKeyDown} />)
    const textarea = screen.getByTestId('prompt-input-textarea')
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })
    expect(onKeyDown).toHaveBeenCalled()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('does not submit when native isComposing or keyCode 229', () => {
    const onSubmit = vi.fn()
    render(<PromptInput value="hello" onSubmit={onSubmit} />)
    const textarea = screen.getByTestId('prompt-input-textarea')
    fireEvent.keyDown(textarea, { key: 'Enter', isComposing: true })
    expect(onSubmit).not.toHaveBeenCalled()

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: 229 })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('respects accessibility attributes and avoids forcing placeholder as aria-label', () => {
    const { rerender } = render(<PromptInput placeholder="Type here..." />)
    const textarea1 = screen.getByTestId('prompt-input-textarea')
    expect(textarea1).not.toHaveAttribute('aria-label')

    rerender(
      <PromptInput
        id="user-input"
        ariaLabel="Message content"
        ariaLabelledby="input-label"
      />
    )
    const textarea2 = screen.getByTestId('prompt-input-textarea')
    expect(textarea2).toHaveAttribute('id', 'user-input')
    expect(textarea2).toHaveAttribute('aria-label', 'Message content')
    expect(textarea2).toHaveAttribute('aria-labelledby', 'input-label')
  })

  test('stoppable alias works and takes precedence over deprecated stopable', () => {
    const { rerender } = render(<PromptInput streaming stoppable />)
    expect(screen.getByTestId('prompt-input-stop-btn')).toBeInTheDocument()

    rerender(<PromptInput streaming stopable />)
    expect(screen.getByTestId('prompt-input-stop-btn')).toBeInTheDocument()

    rerender(<PromptInput streaming stoppable={false} stopable={true} />)
    expect(screen.queryByTestId('prompt-input-stop-btn')).not.toBeInTheDocument()
  })

  test('renders header and toolbar slots', () => {
    render(
      <PromptInput
        header={<span>file.png</span>}
        toolbar={<button type="button">DeepThink</button>}
      />
    )
    expect(screen.getByTestId('prompt-input-header')).toHaveTextContent('file.png')
    expect(screen.getByText('DeepThink')).toBeInTheDocument()
  })
})
