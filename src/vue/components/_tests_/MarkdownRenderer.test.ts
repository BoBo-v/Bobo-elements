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
})
