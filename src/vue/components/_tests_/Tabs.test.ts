import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h, defineComponent } from 'vue'
import Tabs from '../Tabs/Tabs.vue'
import TabPane from '../Tabs/TabPane.vue'

const TabsWrapper = defineComponent({
  props: {
    modelValue: { type: [String, Number], default: 'first' },
    type: { type: String, default: 'line' }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    return () => h(Tabs, {
      modelValue: props.modelValue,
      type: props.type,
      'onUpdate:modelValue': (v: string | number) => emit('update:modelValue', v),
      onChange: (v: string | number) => emit('change', v),
    }, () => [
      h(TabPane, { name: 'first', label: '标签一' }, () => '内容一'),
      h(TabPane, { name: 'second', label: '标签二' }, () => '内容二'),
      h(TabPane, { name: 'third', label: '标签三', disabled: true }, () => '内容三'),
    ])
  }
})

const mountTabs = async (props = {}) => {
  const wrapper = mount(TabsWrapper, { props })
  await nextTick()
  await nextTick()
  return wrapper
}

describe('Tabs.vue', () => {
  test('renders tab headers from TabPane children', async () => {
    const wrapper = await mountTabs()
    const items = wrapper.findAll('.vk-tabs__item')
    expect(items.length).toBe(3)
    expect(items[0].text()).toBe('标签一')
    expect(items[1].text()).toBe('标签二')
    expect(items[2].text()).toBe('标签三')
  })

  test('marks active tab', async () => {
    const wrapper = await mountTabs()
    const items = wrapper.findAll('.vk-tabs__item')
    expect(items[0].classes()).toContain('is-active')
    expect(items[1].classes()).not.toContain('is-active')
  })

  test('marks disabled tab', async () => {
    const wrapper = await mountTabs()
    const items = wrapper.findAll('.vk-tabs__item')
    expect(items[2].classes()).toContain('is-disabled')
  })

  test('emits change when tab clicked', async () => {
    const wrapper = await mountTabs()
    const items = wrapper.findAll('.vk-tabs__item')
    await items[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['second'])
    expect(wrapper.emitted('change')![0]).toEqual(['second'])
  })

  test('does not emit change when disabled tab clicked', async () => {
    const wrapper = await mountTabs()
    const items = wrapper.findAll('.vk-tabs__item')
    await items[2].trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  test('renders card type', async () => {
    const wrapper = await mountTabs({ type: 'card' })
    expect(wrapper.find('.vk-tabs--card').exists()).toBe(true)
  })

  test('shows only active pane content', async () => {
    const wrapper = await mountTabs()
    const panes = wrapper.findAll('.vk-tabs__pane')
    const activePanes = panes.filter(p => p.isVisible())
    expect(activePanes.length).toBe(1)
  })
})
