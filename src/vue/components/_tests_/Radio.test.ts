import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from '../Radio/Radio.vue'
import RadioGroup from '../Radio/RadioGroup.vue'

const mountRadioGroup = (props = {}) => {
  return mount(RadioGroup, {
    props: { modelValue: '1', ...props },
    slots: {
      default: [
        '<Radio value="1" label="选项一" />',
        '<Radio value="2" label="选项二" />',
        '<Radio value="3" label="选项三" />',
      ].join('')
    },
    global: {
      components: { Radio }
    }
  })
}

describe('Radio.vue', () => {
  test('renders radio group with correct number of radios', () => {
    const wrapper = mountRadioGroup()
    const radios = wrapper.findAll('.vk-radio')
    expect(radios.length).toBe(3)
  })

  test('checked radio has is-checked class', () => {
    const wrapper = mountRadioGroup({ modelValue: '2' })
    const radios = wrapper.findAll('.vk-radio')
    expect(radios[0].classes()).not.toContain('is-checked')
    expect(radios[1].classes()).toContain('is-checked')
    expect(radios[2].classes()).not.toContain('is-checked')
  })

  test('emits update:modelValue and change on radio click', async () => {
    const wrapper = mountRadioGroup()
    const inputs = wrapper.findAll('.vk-radio__input')
    await inputs[1].trigger('change')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2'])
    expect(wrapper.emitted('change')![0]).toEqual(['2'])
  })

  test('disabled group prevents interaction', () => {
    const wrapper = mountRadioGroup({ disabled: true })
    const radios = wrapper.findAll('.vk-radio')
    radios.forEach(radio => {
      expect(radio.classes()).toContain('is-disabled')
    })
    const inputs = wrapper.findAll('.vk-radio__input')
    inputs.forEach(input => {
      expect(input.attributes('disabled')).toBeDefined()
    })
  })

  test('renders label text', () => {
    const wrapper = mountRadioGroup()
    const labels = wrapper.findAll('.vk-radio__label')
    expect(labels[0].text()).toBe('选项一')
    expect(labels[1].text()).toBe('选项二')
  })
})
