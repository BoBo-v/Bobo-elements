import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CodeBlock from '../CodeBlock.vue'

describe('CodeBlock.vue', () => {
  test('basic render', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'const x = 1;' }
    })
    expect(wrapper.classes()).toContain('vk-code-block')
    expect(wrapper.find('.vk-code-block__code').exists()).toBeTruthy()
  })

  test('shows language in header', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'let x = 1;', language: 'javascript' }
    })
    expect(wrapper.find('.vk-code-block__language').text()).toBe('javascript')
  })

  test('shows title over language', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'let x = 1;', language: 'javascript', title: 'app.js' }
    })
    expect(wrapper.find('.vk-code-block__language').text()).toBe('app.js')
  })

  test('shows line numbers', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'line1\nline2\nline3', showLineNumbers: true }
    })
    const numbers = wrapper.findAll('.vk-code-block__line-number')
    expect(numbers).toHaveLength(3)
    expect(numbers[0].text()).toBe('1')
    expect(numbers[2].text()).toBe('3')
  })

  test('copy button exists by default', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'test' }
    })
    expect(wrapper.find('[data-testid="code-block-copy-btn"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-testid="code-block-copy-btn"]').text()).toBe('复制')
  })

  test('copy button hidden when copyable is false', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'test', copyable: false }
    })
    expect(wrapper.find('[data-testid="code-block-copy-btn"]').exists()).toBeFalsy()
  })

  test('custom copy text', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'test', copyText: 'Copy', copiedText: 'Copied' }
    })
    expect(wrapper.find('[data-testid="code-block-copy-btn"]').text()).toBe('Copy')
  })

  test('no header when no title, language, or copyable', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'test', copyable: false }
    })
    expect(wrapper.find('.vk-code-block__header').exists()).toBeFalsy()
  })

  test('applies max height', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'test', maxHeight: '200px' }
    })
    expect(wrapper.find('.vk-code-block__body').attributes('style')).toContain('max-height: 200px')
  })
})
