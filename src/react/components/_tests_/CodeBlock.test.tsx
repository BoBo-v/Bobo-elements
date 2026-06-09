import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CodeBlock } from '../CodeBlock'

describe('CodeBlock component', () => {
  test('basic render', () => {
    render(<CodeBlock code="const x = 1;" />)
    expect(screen.getByTestId('code-block')).toBeInTheDocument()
    expect(screen.getByTestId('code-block')).toHaveClass('vk-code-block')
  })

  test('shows language in header', () => {
    render(<CodeBlock code="let x = 1;" language="javascript" />)
    expect(screen.getByText('javascript')).toBeInTheDocument()
  })

  test('shows title over language', () => {
    render(<CodeBlock code="let x = 1;" language="javascript" title="app.js" />)
    expect(screen.getByText('app.js')).toBeInTheDocument()
  })

  test('shows line numbers', () => {
    const { container } = render(<CodeBlock code={'line1\nline2\nline3'} showLineNumbers />)
    const numbers = container.querySelectorAll('.vk-code-block__line-number')
    expect(numbers).toHaveLength(3)
    expect(numbers[0].textContent).toBe('1')
  })

  test('copy button exists by default', () => {
    render(<CodeBlock code="test" />)
    expect(screen.getByTestId('code-block-copy-btn')).toHaveTextContent('复制')
  })

  test('copy button hidden when copyable is false', () => {
    render(<CodeBlock code="test" copyable={false} />)
    expect(screen.queryByTestId('code-block-copy-btn')).toBeNull()
  })

  test('no header when no title, language, or copyable', () => {
    const { container } = render(<CodeBlock code="test" copyable={false} />)
    expect(container.querySelector('.vk-code-block__header')).toBeNull()
  })
})
