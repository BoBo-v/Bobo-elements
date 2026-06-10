import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReasoningBlock from '../ReasoningBlock.vue'

describe('ReasoningBlock.vue', () => {
  test('basic render', () => {
    const wrapper = mount(ReasoningBlock, {
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.classes()).toContain('vk-reasoning-block')
    expect(wrapper.find('.vk-reasoning-block__title').text()).toBe('分析过程')
  })

  test('custom title', () => {
    const wrapper = mount(ReasoningBlock, {
      props: { title: '推理过程' },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('.vk-reasoning-block__title').text()).toBe('推理过程')
  })

  test('shows duration', () => {
    const wrapper = mount(ReasoningBlock, {
      props: { duration: 1500 },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('.vk-reasoning-block__duration').text()).toContain('1.5s')
  })

  test('shows duration in ms', () => {
    const wrapper = mount(ReasoningBlock, {
      props: { duration: 800 },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('.vk-reasoning-block__duration').text()).toContain('800ms')
  })

  test('shows token count', () => {
    const wrapper = mount(ReasoningBlock, {
      props: { tokenCount: 42 },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('.vk-reasoning-block__tokens').text()).toContain('42 tokens')
  })

  test('hides meta when no duration or tokenCount', () => {
    const wrapper = mount(ReasoningBlock, {
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('.vk-reasoning-block__meta').exists()).toBeFalsy()
  })
})
