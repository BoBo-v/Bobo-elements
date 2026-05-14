import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../Modal/Modal.vue'

describe('Modal.vue', () => {
  test('renders when modelValue is true', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: '测试弹窗' },
      global: { stubs: { teleport: true } }
    })
    expect(wrapper.find('.vk-overlay').exists()).toBe(true)
    expect(wrapper.find('.vk-modal__title').text()).toBe('测试弹窗')
  })

  test('does not render when modelValue is false', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: false, title: '测试弹窗' },
      global: { stubs: { teleport: true } }
    })
    expect(wrapper.find('.vk-overlay').exists()).toBe(false)
  })

  test('emits close when close button clicked', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: '测试' },
      global: { stubs: { teleport: true } }
    })
    await wrapper.find('.vk-modal__close').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  test('emits close when mask clicked with maskClosable', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: '测试', maskClosable: true },
      global: { stubs: { teleport: true } }
    })
    await wrapper.find('.vk-overlay').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  test('does not emit close when mask clicked with maskClosable false', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: '测试', maskClosable: false },
      global: { stubs: { teleport: true } }
    })
    await wrapper.find('.vk-overlay').trigger('click')
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  test('hides close button when closable is false', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: '测试', closable: false },
      global: { stubs: { teleport: true } }
    })
    expect(wrapper.find('.vk-modal__close').exists()).toBe(false)
  })

  test('hides footer when showFooter is false', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: '测试', showFooter: false },
      global: { stubs: { teleport: true } }
    })
    expect(wrapper.find('.vk-modal__footer').exists()).toBe(false)
  })

  test('emits confirm when confirm button clicked', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: '测试' },
      global: { stubs: { teleport: true } }
    })
    const buttons = wrapper.findAll('.vk-modal__footer .vk-button')
    await buttons[1].trigger('click')
    expect(wrapper.emitted()).toHaveProperty('confirm')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  test('emits cancel when cancel button clicked', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: '测试' },
      global: { stubs: { teleport: true } }
    })
    const buttons = wrapper.findAll('.vk-modal__footer .vk-button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted()).toHaveProperty('cancel')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  test('renders slot content', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: '测试' },
      slots: { default: '<p>弹窗内容</p>' },
      global: { stubs: { teleport: true } }
    })
    expect(wrapper.find('.vk-modal__body').text()).toContain('弹窗内容')
  })
})
