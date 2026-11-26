import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Attachment from '../Attachment.vue'

describe('Attachment.vue', () => {
  const items = [
    { id: '1', name: 'design.png', size: 2048, type: 'image/png', url: 'https://example.com/a.png', status: 'done' as const },
    { id: '2', name: 'report.pdf', size: 1024, status: 'uploading' as const, progress: 60 },
    { id: '3', name: 'failed.ts', status: 'error' as const, errorMessage: '网络超时' }
  ]

  test('renders image thumb, progress, error retry, and remove', async () => {
    const wrapper = mount(Attachment, {
      props: { items, clickable: true },
      global: { stubs: ['Icon'] }
    })
    const cards = wrapper.findAll('[data-testid="attachment-card"]')
    expect(cards).toHaveLength(3)
    expect(cards[0].find('img').attributes('src')).toBe('https://example.com/a.png')
    expect(cards[1].find('[data-testid="attachment-progress"]').exists()).toBe(true)
    expect(cards[2].text()).toContain('网络超时')

    await cards[2].find('[data-testid="attachment-retry-btn"]').trigger('click')
    expect(wrapper.emitted('retry')?.[0]).toEqual([items[2]])

    await cards[0].find('[data-testid="attachment-remove-btn"]').trigger('click')
    expect(wrapper.emitted('remove')?.[0]).toEqual([items[0]])
  })
})
