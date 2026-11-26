import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from '../Switch.vue'

describe('Switch.vue', () => {
  test('renders switch with role="switch" and aria-checked', () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false }
    })
    const btn = wrapper.find('button.vk-switch__core')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('role')).toBe('switch')
    expect(btn.attributes('aria-checked')).toBe('false')
    expect(wrapper.classes()).not.toContain('is-checked')
  })

  test('toggles value and emits update:modelValue and change on click', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false }
    })
    const btn = wrapper.find('button.vk-switch__core')
    await btn.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    expect(wrapper.emitted('change')![0]).toEqual([true])
    expect(wrapper.classes()).toContain('is-checked')
    expect(btn.attributes('aria-checked')).toBe('true')
  })

  test('supports custom activeValue and inactiveValue', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: 'right',
        activeValue: 'right',
        inactiveValue: 'wrong'
      }
    })
    expect(wrapper.classes()).toContain('is-checked')
    await wrapper.find('button.vk-switch__core').trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['wrong'])
    expect(wrapper.emitted('change')![0]).toEqual(['wrong'])
  })

  test('disabled switch prevents toggling', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    const btn = wrapper.find('button.vk-switch__core')
    expect(btn.attributes('disabled')).toBeDefined()
    await btn.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  test('renders size classes and active/inactive text', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        size: 'large',
        activeText: 'ON',
        inactiveText: 'OFF'
      }
    })
    expect(wrapper.classes()).toContain('vk-switch--large')
    expect(wrapper.find('.vk-switch__core-inner-text').text()).toBe('OFF')
    await wrapper.setProps({ modelValue: true, size: 'small' })
    expect(wrapper.classes()).toContain('vk-switch--small')
    expect(wrapper.find('.vk-switch__core-inner-text').text()).toBe('ON')
  })

  test('renders hidden input when name is provided', () => {
    const wrapper = mount(Switch, {
      props: { modelValue: true, name: 'agree', id: 'agree-id' }
    })
    const input = wrapper.find('input.vk-switch__input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('name')).toBe('agree')
    expect(input.attributes('value')).toBe('true')
    expect(wrapper.find('button.vk-switch__core').attributes('id')).toBe('agree-id')
  })
})
