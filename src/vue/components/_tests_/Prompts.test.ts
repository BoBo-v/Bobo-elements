import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Prompts from '../Prompts.vue'

describe('Prompts.vue', () => {
  const items = [
    { key: '1', label: '写一个防抖函数', description: 'TypeScript 泛型版', icon: 'code' },
    { key: '2', label: '禁用项', disabled: true }
  ]

  test('renders items and emits select', async () => {
    const wrapper = mount(Prompts, {
      props: { title: '猜你想问', items, variant: 'pill', layout: 'horizontal' },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('[data-testid="prompts-title"]').text()).toBe('猜你想问')
    const btns = wrapper.findAll('[data-testid="prompts-item"]')
    expect(btns).toHaveLength(2)
    await btns[0].trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([items[0]])

    await btns[1].trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
  })
})
