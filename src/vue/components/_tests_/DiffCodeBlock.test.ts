import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DiffCodeBlock from '../DiffCodeBlock.vue'

describe('DiffCodeBlock.vue', () => {
  test('computes diff lines and emits apply/reject', async () => {
    const wrapper = mount(DiffCodeBlock, {
      props: {
        title: 'utils.ts',
        oldCode: 'const a = 1\nconst b = 2',
        newCode: 'const a = 1\nconst b = 3',
        actionable: true
      }
    })
    expect(wrapper.find('.vk-diff-code-block__stat-add').text()).toBe('+1')
    expect(wrapper.find('.vk-diff-code-block__stat-del').text()).toBe('-1')
    await wrapper.find('[data-testid="diff-apply-btn"]').trigger('click')
    expect(wrapper.emitted('apply')?.[0]).toEqual(['const a = 1\nconst b = 3'])
    await wrapper.find('[data-testid="diff-reject-btn"]').trigger('click')
    expect(wrapper.emitted('reject')).toHaveLength(1)
  })
})
