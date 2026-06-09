import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatMessage from '../ChatMessage.vue'

describe('ChatMessage.vue', () => {
  test('basic render with user role', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'user' },
      slots: { default: 'Hello' },
      global: { stubs: ['Icon', 'ThinkingIndicator'] }
    })
    expect(wrapper.classes()).toContain('vk-chat-message--user')
    expect(wrapper.find('[data-testid="chat-message-bubble"]').text()).toBe('Hello')
  })

  test('assistant role', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'assistant' },
      slots: { default: 'Hi there' },
      global: { stubs: ['Icon', 'ThinkingIndicator'] }
    })
    expect(wrapper.classes()).toContain('vk-chat-message--assistant')
  })

  test('system role', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'system' },
      slots: { default: 'System message' },
      global: { stubs: ['Icon', 'ThinkingIndicator'] }
    })
    expect(wrapper.classes()).toContain('vk-chat-message--system')
  })

  test('shows avatar by default', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'user' },
      global: { stubs: ['Icon', 'ThinkingIndicator'] }
    })
    expect(wrapper.find('[data-testid="chat-message-avatar"]').exists()).toBeTruthy()
  })

  test('hides avatar when showAvatar is false', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'user', showAvatar: false },
      global: { stubs: ['Icon', 'ThinkingIndicator'] }
    })
    expect(wrapper.find('[data-testid="chat-message-avatar"]').exists()).toBeFalsy()
  })

  test('shows timestamp', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'user', timestamp: '2024-01-01T12:30:00' },
      global: { stubs: ['Icon', 'ThinkingIndicator'] }
    })
    expect(wrapper.find('[data-testid="chat-message-timestamp"]').exists()).toBeTruthy()
  })

  test('shows error status with retry', async () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'assistant', status: 'error' },
      global: { stubs: ['Icon', 'ThinkingIndicator'] }
    })
    expect(wrapper.find('[data-testid="chat-message-error"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-testid="chat-message-error"]').text()).toContain('发送失败')
    await wrapper.find('[data-testid="chat-message-retry"]').trigger('click')
    expect(wrapper.emitted('retry')).toBeTruthy()
  })

  test('custom error message', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'assistant', status: 'error', errorMessage: 'Failed' },
      global: { stubs: ['Icon', 'ThinkingIndicator'] }
    })
    expect(wrapper.find('[data-testid="chat-message-error"]').text()).toContain('Failed')
  })
})
