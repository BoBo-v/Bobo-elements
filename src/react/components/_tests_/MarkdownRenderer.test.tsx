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

  test('sanitizes unsafe links and images', () => {
    const { container } = render(<MarkdownRenderer content={'[bad](javascript:alert(1))\n![bad](javascript:alert(1))'} />)
    expect(container.innerHTML).not.toContain('javascript:alert')
    expect(container.innerHTML).toContain('href="#"')
  })

  test('renders empty content', () => {
    const { container } = render(<MarkdownRenderer content="" />)
    expect(container.querySelector('.vk-md-p')).toBeNull()
  })
})
