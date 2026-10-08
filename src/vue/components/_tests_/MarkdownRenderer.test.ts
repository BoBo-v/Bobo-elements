import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MarkdownRenderer from '../MarkdownRenderer.vue'

describe('MarkdownRenderer.vue', () => {
  test('basic render', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: { content: 'Hello world' }
    })
    expect(wrapper.classes()).toContain('vk-markdown-renderer')
    expect(wrapper.html()).toContain('Hello world')
  })

  test('renders headings', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: { content: '# Title\n## Subtitle' }
    })
    expect(wrapper.html()).toContain('vk-md-h1')
    expect(wrapper.html()).toContain('vk-md-h2')
    expect(wrapper.html()).toContain('Title')
  })

  test('renders bold and italic', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: { content: '**bold** and *italic*' }
    })
    expect(wrapper.html()).toContain('vk-md-bold')
    expect(wrapper.html()).toContain('vk-md-italic')
  })

  test('renders inline code', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: { content: 'use `console.log`' }
    })
    expect(wrapper.html()).toContain('vk-md-inline-code')
    expect(wrapper.html()).toContain('console.log')
  })

  test('renders links', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: { content: '[Google](https://google.com)' }
    })
    expect(wrapper.html()).toContain('vk-md-link')
    expect(wrapper.html()).toContain('https://google.com')
  })

  test('sanitizes unsafe links and images', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: { content: '[bad](javascript:alert(1))\n![bad](javascript:alert(1))' }
    })
    expect(wrapper.html()).not.toContain('javascript:alert')
    expect(wrapper.html()).toContain('href="#"')
  })

  test('renders blockquote', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: { content: '> quoted text' }
    })
    expect(wrapper.html()).toContain('vk-md-blockquote')
  })

  test('renders empty content', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: { content: '' }
    })
    expect(wrapper.html()).not.toContain('vk-md-p')
  })

  test('renders ordered list with ol and li classes', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: { content: '1. First item\n2. Second item' }
    })
    expect(wrapper.find('ol.vk-md-ol').exists()).toBe(true)
    const items = wrapper.findAll('li.vk-md-li')
    expect(items.length).toBe(2)
    expect(items[0].text()).toBe('First item')
    expect(items[1].text()).toBe('Second item')
  })

  test('renders nested lists properly', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: {
        content: '- Parent 1\n  - Child 1\n  - Child 2\n- Parent 2'
      }
    })
    expect(wrapper.findAll('ul.vk-md-ul').length).toBeGreaterThanOrEqual(2)
    expect(wrapper.findAll('li.vk-md-li').length).toBe(4)
  })

  test('blocks SVG data URL in images while allowing raster images', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: {
        content: '![xss svg](data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=)\n![safe png](data:image/png;base64,iVBORw0KGgo=)'
      }
    })
    const html = wrapper.html()
    expect(html).not.toContain('data:image/svg+xml')
    expect(html).toContain('data:image/png;base64')
  })

  test('disables raw HTML tags to prevent XSS injection', () => {
    const wrapper = mount(MarkdownRenderer, {
      props: {
        content: '<script>alert(1)</script><img src="x" onerror="alert(2)">'
      }
    })
    expect(wrapper.find('script').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(false)
  })
})
