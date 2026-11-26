import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Sources from '../Sources.vue'

describe('Sources.vue', () => {
  const items = [
    { id: 1, title: 'Vue 3 官方文档', url: 'https://vuejs.org', domain: 'vuejs.org', snippet: '渐进式框架' },
    { id: 2, title: '不安全链接', url: 'javascript:alert(1)' }
  ]

  test('toggles sources list, sanitizes unsafe URL, and emits select', async () => {
    const wrapper = mount(Sources, {
      props: { items, variant: 'cards' },
      global: { stubs: ['Icon'] }
    })

    expect(wrapper.find('[data-testid="sources-toggle"]').text()).toContain('参考来源 (2)')
    expect(wrapper.find('[data-testid="sources-list"]').exists()).toBe(false)

    await wrapper.find('[data-testid="sources-toggle"]').trigger('click')
    const renderedItems = wrapper.findAll('[data-testid="sources-item"]')
    expect(renderedItems).toHaveLength(2)
    expect(renderedItems[0].element.tagName).toBe('A')
    expect(renderedItems[1].element.tagName).toBe('DIV')

    await renderedItems[0].trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([items[0]])
  })
})
