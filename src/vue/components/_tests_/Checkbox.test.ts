import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from '../Checkbox/Checkbox.vue'
import CheckboxGroup from '../Checkbox/CheckboxGroup.vue'

const mountCheckboxGroup = (props = {}) => {
  return mount(CheckboxGroup, {
    props: { modelValue: ['上海', '北京'], ...props },
    slots: {
      default: [
        '<Checkbox value="上海" label="上海" />',
        '<Checkbox value="北京" label="北京" />',
        '<Checkbox value="广州" label="广州" />',
        '<Checkbox value="深圳" label="深圳" />',
      ].join('')
    },
    global: {
      components: { Checkbox }
    }
  })
}

describe('Checkbox.vue', () => {
  test('renders checkbox group with correct number of checkboxes', () => {
    const wrapper = mountCheckboxGroup()
    const checkboxes = wrapper.findAll('.vk-checkbox')
    expect(checkboxes.length).toBe(4)
  })

  test('checked checkboxes have is-checked class', () => {
    const wrapper = mountCheckboxGroup()
    const checkboxes = wrapper.findAll('.vk-checkbox')
    expect(checkboxes[0].classes()).toContain('is-checked')
    expect(checkboxes[1].classes()).toContain('is-checked')
    expect(checkboxes[2].classes()).not.toContain('is-checked')
    expect(checkboxes[3].classes()).not.toContain('is-checked')
  })

  test('emits change when checkbox clicked', async () => {
    const wrapper = mountCheckboxGroup()
    const inputs = wrapper.findAll('.vk-checkbox__input')
    await inputs[2].trigger('change')
    const emitted = wrapper.emitted('update:modelValue')!
    expect(emitted[0][0]).toContain('广州')
  })

  test('emits change when checked checkbox unchecked', async () => {
    const wrapper = mountCheckboxGroup()
    const inputs = wrapper.findAll('.vk-checkbox__input')
    await inputs[0].trigger('change')
    const emitted = wrapper.emitted('update:modelValue')!
    expect(emitted[0][0]).not.toContain('上海')
  })

  test('disabled group prevents interaction', () => {
    const wrapper = mountCheckboxGroup({ disabled: true })
    const checkboxes = wrapper.findAll('.vk-checkbox')
    checkboxes.forEach(cb => {
      expect(cb.classes()).toContain('is-disabled')
    })
  })

  test('max limit disables unchecked items', () => {
    const wrapper = mountCheckboxGroup({ max: 2 })
    const checkboxes = wrapper.findAll('.vk-checkbox')
    expect(checkboxes[2].classes()).toContain('is-disabled')
    expect(checkboxes[3].classes()).toContain('is-disabled')
  })

  test('min limit disables checked items', () => {
    const wrapper = mountCheckboxGroup({ min: 2 })
    const checkboxes = wrapper.findAll('.vk-checkbox')
    expect(checkboxes[0].classes()).toContain('is-disabled')
    expect(checkboxes[1].classes()).toContain('is-disabled')
  })

  test('renders label text', () => {
    const wrapper = mountCheckboxGroup()
    const labels = wrapper.findAll('.vk-checkbox__label')
    expect(labels[0].text()).toBe('上海')
    expect(labels[1].text()).toBe('北京')
  })
})
