import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '../Tag/Tag.vue'

describe('Tag.vue', () => {
  test('renders with type class', () => {
    const wrapper = mount(Tag, {
      props: { type: 'success' },
      slots: { default: '标签' }
    })
    expect(wrapper.find('.vk-tag').exists()).toBe(true)
    expect(wrapper.classes()).toContain('vk-tag--success')
    expect(wrapper.text()).toContain('标签')
  })

  test('renders with different effects', () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary', effect: 'dark' },
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('vk-tag--dark')
  })

  test('renders with size', () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary', size: 'large' },
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('vk-tag--large')
  })

  test('renders round tag', () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary', round: true },
      slots: { default: '标签' }
    })
    expect(wrapper.classes()).toContain('is-round')
  })

  test('closable tag hides and emits close', async () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary', closable: true },
      slots: { default: '标签' }
    })
    expect(wrapper.find('.vk-tag__close').exists()).toBe(true)
    await wrapper.find('.vk-tag__close').trigger('click')
    expect(wrapper.find('.vk-tag').exists()).toBe(false)
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  test('non-closable tag does not render close button', () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary', closable: false },
      slots: { default: '标签' }
    })
    expect(wrapper.find('.vk-tag__close').exists()).toBe(false)
  })

  test('emits click event', async () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary' },
      slots: { default: '标签' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('custom color applies inline style', () => {
    const wrapper = mount(Tag, {
      props: { type: 'primary', color: '#ff0000' },
      slots: { default: '标签' }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('background-color: rgb(255, 0, 0)')
  })
})
