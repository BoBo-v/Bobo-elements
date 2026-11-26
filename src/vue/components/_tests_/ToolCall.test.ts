import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToolCall from '../ToolCall.vue'

describe('ToolCall.vue', () => {
  test('renders status, expands args/result, and emits approval events', async () => {
    const wrapper = mount(ToolCall, {
      props: {
        title: '检索知识库',
        toolName: 'search_docs',
        status: 'awaiting-approval',
        duration: 320,
        args: { query: 'Vue3' },
        result: { hits: 3 }
      },
      global: { stubs: ['Icon'] }
    })

    expect(wrapper.find('[data-testid="tool-call-status"]').text()).toBe('等待确认')
    expect(wrapper.find('[data-testid="tool-call-body"]').exists()).toBe(false)

    await wrapper.find('[data-testid="tool-call-header"]').trigger('click')
    expect(wrapper.find('[data-testid="tool-call-args"]').text()).toContain('"query": "Vue3"')
    expect(wrapper.find('[data-testid="tool-call-result"]').text()).toContain('"hits": 3')

    await wrapper.find('[data-testid="tool-call-approve-btn"]').trigger('click')
    await wrapper.find('[data-testid="tool-call-reject-btn"]').trigger('click')
    expect(wrapper.emitted('approve')).toHaveLength(1)
    expect(wrapper.emitted('reject')).toHaveLength(1)
  })
})
