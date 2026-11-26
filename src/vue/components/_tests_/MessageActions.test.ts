import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageActions from '../MessageActions.vue'

describe('MessageActions.vue', () => {
  test('emits regenerate, feedback, and branch-change events', async () => {
    const wrapper = mount(MessageActions, {
      props: {
        content: 'hello',
        regenerable: true,
        editable: true,
        feedback: null,
        branchIndex: 2,
        branchTotal: 3
      },
      global: { stubs: ['Icon'] }
    })

    await wrapper.find('[data-testid="message-actions-regenerate"]').trigger('click')
    expect(wrapper.emitted('regenerate')).toHaveLength(1)

    await wrapper.find('[data-testid="message-actions-like"]').trigger('click')
    expect(wrapper.emitted('feedback')?.[0]).toEqual(['like'])

    await wrapper.find('[data-testid="message-actions-prev"]').trigger('click')
    expect(wrapper.emitted('branch-change')?.[0]).toEqual([1])
  })
})
