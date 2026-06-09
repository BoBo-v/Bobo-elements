import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConversationList from '../ConversationList.vue'

describe('ConversationList.vue', () => {
  test('basic render', () => {
    const wrapper = mount(ConversationList)
    expect(wrapper.classes()).toContain('vk-conversation-list')
    expect(wrapper.attributes('role')).toBe('log')
    expect(wrapper.attributes('aria-live')).toBe('polite')
  })

  test('shows empty text when no content', () => {
    const wrapper = mount(ConversationList)
    expect(wrapper.find('[data-testid="conversation-list-empty"]').text()).toBe('暂无对话')
  })

  test('custom empty text', () => {
    const wrapper = mount(ConversationList, {
      props: { emptyText: 'No messages' }
    })
    expect(wrapper.find('[data-testid="conversation-list-empty"]').text()).toBe('No messages')
  })

  test('shows loading indicator', () => {
    const wrapper = mount(ConversationList, {
      props: { loadingMore: true }
    })
    expect(wrapper.find('[data-testid="conversation-list-loading"]').exists()).toBeTruthy()
  })

  test('applies max height', () => {
    const wrapper = mount(ConversationList, {
      props: { maxHeight: '500px' }
    })
    expect(wrapper.attributes('style')).toContain('max-height: 500px')
  })
})
