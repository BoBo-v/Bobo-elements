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

  test('renders ordered list with ol and li classes', () => {
    const { container } = render(<MarkdownRenderer content={'1. First item\n2. Second item'} />)
    expect(container.querySelector('ol.vk-md-ol')).toBeTruthy()
    const items = container.querySelectorAll('li.vk-md-li')
    expect(items.length).toBe(2)
  })

  test('renders nested lists properly', () => {
    const { container } = render(<MarkdownRenderer content={'- Parent 1\n  - Child 1\n  - Child 2\n- Parent 2'} />)
    expect(container.querySelectorAll('ul.vk-md-ul').length).toBeGreaterThanOrEqual(2)
    expect(container.querySelectorAll('li.vk-md-li').length).toBe(4)
  })

  test('blocks SVG data URL in images while allowing raster images', () => {
    const { container } = render(
      <MarkdownRenderer
        content={'![xss svg](data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=)\n![safe png](data:image/png;base64,iVBORw0KGgo=)'}
      />
    )
    expect(container.innerHTML).not.toContain('data:image/svg+xml')
    expect(container.innerHTML).toContain('data:image/png;base64')
  })

  test('disables raw HTML tags to prevent XSS injection', () => {
    const { container } = render(
      <MarkdownRenderer content={'<script>alert(1)</script><img src="x" onerror="alert(2)">'} />
    )
    expect(container.querySelector('script')).toBeNull()
    expect(container.querySelector('img')).toBeNull()
  })
})
