import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MarkdownRenderer } from '../MarkdownRenderer'

describe('MarkdownRenderer component', () => {
  test('basic render', () => {
    render(<MarkdownRenderer content="Hello world" />)
    const el = screen.getByTestId('markdown-renderer')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('vk-markdown-renderer')
    expect(el.innerHTML).toContain('Hello world')
  })

  test('renders headings', () => {
    const { container } = render(<MarkdownRenderer content={'# Title\n## Subtitle'} />)
    expect(container.querySelector('.vk-md-h1')).toBeTruthy()
    expect(container.querySelector('.vk-md-h2')).toBeTruthy()
  })

  test('renders bold', () => {
    const { container } = render(<MarkdownRenderer content="**bold**" />)
    expect(container.querySelector('.vk-md-bold')).toBeTruthy()
  })

  test('renders inline code', () => {
    const { container } = render(<MarkdownRenderer content="use `log`" />)
    expect(container.querySelector('.vk-md-inline-code')).toBeTruthy()
  })

  test('renders empty content', () => {
    const { container } = render(<MarkdownRenderer content="" />)
    expect(container.querySelector('.vk-md-p')).toBeNull()
  })
})
