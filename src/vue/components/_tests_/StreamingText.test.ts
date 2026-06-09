import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StreamingText from '../StreamingText.vue'

describe('StreamingText.vue', () => {
  test('renders with empty text', () => {
    const wrapper = mount(StreamingText)
    expect(wrapper.classes()).toContain('vk-streaming-text')
    expect(wrapper.find('[data-testid="streaming-text-content"]').text()).toBe('')
    expect(wrapper.find('[data-testid="streaming-text-cursor"]').text()).toBe('│')
  })

  test('shows cursor by default', () => {
    const wrapper = mount(StreamingText, {
      props: { text: 'hello' }
    })
    expect(wrapper.find('[data-testid="streaming-text-cursor"]').exists()).toBeTruthy()
  })

  test('hides cursor when showCursor is false', () => {
    const wrapper = mount(StreamingText, {
      props: { text: 'hello', showCursor: false }
    })
    expect(wrapper.find('[data-testid="streaming-text-cursor"]').exists()).toBeFalsy()
  })

  test('custom cursor char', () => {
    const wrapper = mount(StreamingText, {
      props: { text: 'hi', cursorChar: '|' }
    })
    expect(wrapper.find('[data-testid="streaming-text-cursor"]').text()).toBe('|')
  })

  test('exposes reset and isComplete', () => {
    const wrapper = mount(StreamingText, {
      props: { text: 'hi' }
    })
    expect(wrapper.vm.reset).toBeDefined()
    expect(wrapper.vm.isComplete).toBeDefined()
  })
})
