import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PromptInput from '../PromptInput.vue'

describe('PromptInput.vue', () => {
  test('basic render', () => {
    const wrapper = mount(PromptInput, {
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.classes()).toContain('vk-prompt-input')
    expect(wrapper.find('[data-testid="prompt-input-textarea"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-testid="prompt-input-send-btn"]').exists()).toBeTruthy()
  })

  test('shows placeholder', () => {
    const wrapper = mount(PromptInput, {
      props: { placeholder: 'Ask me...' },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Ask me...')
  })

  test('disabled state', () => {
    const wrapper = mount(PromptInput, {
      props: { disabled: true },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  test('streaming state', () => {
    const wrapper = mount(PromptInput, {
      props: { streaming: true },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.classes()).toContain('is-streaming')
    expect(wrapper.find('.vk-prompt-input__streaming-badge').exists()).toBeTruthy()
    expect(wrapper.find('[data-testid="prompt-input-send-btn"]').attributes('disabled')).toBeDefined()
  })

  test('shows count when showCount and maxLength', () => {
    const wrapper = mount(PromptInput, {
      props: { modelValue: 'hello', showCount: true, maxLength: 100 },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('.vk-prompt-input__count').text()).toContain('5')
    expect(wrapper.find('.vk-prompt-input__count').text()).toContain('100')
  })

  test('emits update:modelValue on input', async () => {
    const wrapper = mount(PromptInput, {
      global: { stubs: ['Icon'] }
    })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('test input')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  test('emits submit on Enter', async () => {
    const wrapper = mount(PromptInput, {
      props: { modelValue: 'hello' },
      global: { stubs: ['Icon'] }
    })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false })
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')![0]).toEqual(['hello'])
  })

  test('does not emit submit on Shift+Enter', async () => {
    const wrapper = mount(PromptInput, {
      props: { modelValue: 'hello' },
      global: { stubs: ['Icon'] }
    })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: true })
    expect(wrapper.emitted('submit')).toBeFalsy()
  })
})
