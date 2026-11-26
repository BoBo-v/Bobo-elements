import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SessionList from '../SessionList.vue'

describe('SessionList.vue', () => {
  const items = [
    { id: '1', title: '置顶对话', pinned: true },
    { id: '2', title: 'Vue3 问题排查', updatedAt: new Date() },
    { id: '3', title: 'SQL 优化' }
  ]

  test('groups pinned/time items, searches, creates, and renames', async () => {
    const wrapper = mount(SessionList, {
      props: { items, activeId: '2', searchable: true },
      global: { stubs: ['Icon'] }
    })

    expect(wrapper.findAll('[data-testid="session-list-item"]')).toHaveLength(3)
    await wrapper.find('[data-testid="session-list-search"]').setValue('Vue3')
    expect(wrapper.findAll('[data-testid="session-list-item"]')).toHaveLength(1)

    await wrapper.find('[data-testid="session-list-create-btn"]').trigger('click')
    expect(wrapper.emitted('create')).toHaveLength(1)

    await wrapper.find('[data-testid="session-list-rename-btn"]').trigger('click')
    const input = wrapper.find('[data-testid="session-list-rename-input"]')
    await input.setValue('新标题')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('rename')?.[0]).toEqual([items[1], '新标题'])
  })
})
