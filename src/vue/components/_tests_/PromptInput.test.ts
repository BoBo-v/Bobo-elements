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

  test('does not submit while composing text', async () => {
    const wrapper = mount(PromptInput, {
      props: { modelValue: '你好' },
      global: { stubs: ['Icon'] }
    })
    const textarea = wrapper.find('textarea')
    await textarea.trigger('compositionstart')
    await textarea.trigger('keydown', { key: 'Enter', shiftKey: false })
    expect(wrapper.emitted('submit')).toBeFalsy()
    await textarea.trigger('compositionend')
    await textarea.trigger('keydown', { key: 'Enter', shiftKey: false })
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  test('emits stop when stop button is clicked', async () => {
    const wrapper = mount(PromptInput, {
      props: { streaming: true, stopable: true },
      global: { stubs: ['Icon'] }
    })
    await wrapper.find('[data-testid="prompt-input-stop-btn"]').trigger('click')
    expect(wrapper.emitted('stop')).toBeTruthy()
  })

  test('does not emit submit if keydown default was prevented by external handler', async () => {
    const wrapper = mount(PromptInput, {
      props: {
        modelValue: 'hello',
        onKeydown: (e: KeyboardEvent) => {
          e.preventDefault()
        }
      },
      global: { stubs: ['Icon'] }
    })
    const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true })
    const textarea = wrapper.find('textarea').element
    textarea.dispatchEvent(event)
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  test('does not emit submit when native isComposing or keyCode 229 is present', async () => {
    const wrapper = mount(PromptInput, {
      props: { modelValue: 'hello' },
      global: { stubs: ['Icon'] }
    })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', isComposing: true })
    expect(wrapper.emitted('submit')).toBeFalsy()

    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', keyCode: 229 })
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  test('respects accessibility attributes and does not force placeholder as aria-label', () => {
    const wrapperWithoutAria = mount(PromptInput, {
      props: { placeholder: 'Type here...' },
      global: { stubs: ['Icon'] }
    })
    expect(wrapperWithoutAria.find('textarea').attributes('aria-label')).toBeUndefined()

    const wrapperWithAria = mount(PromptInput, {
      props: {
        id: 'user-input',
        ariaLabel: 'Message content',
        ariaLabelledby: 'input-label'
      },
      global: { stubs: ['Icon'] }
    })
    const textarea = wrapperWithAria.find('textarea')
    expect(textarea.attributes('id')).toBe('user-input')
    expect(textarea.attributes('aria-label')).toBe('Message content')
    expect(textarea.attributes('aria-labelledby')).toBe('input-label')
  })

  test('stoppable alias works and takes precedence over deprecated stopable', () => {
    // New prop works
    const wrapperNew = mount(PromptInput, {
      props: { streaming: true, stoppable: true },
      global: { stubs: ['Icon'] }
    })
    expect(wrapperNew.find('[data-testid="prompt-input-stop-btn"]').exists()).toBe(true)

    // Deprecated prop backwards compatibility
    const wrapperOld = mount(PromptInput, {
      props: { streaming: true, stopable: true },
      global: { stubs: ['Icon'] }
    })
    expect(wrapperOld.find('[data-testid="prompt-input-stop-btn"]').exists()).toBe(true)

    // stoppable precedence over stopable
    const wrapperPrecedence = mount(PromptInput, {
      props: { streaming: true, stoppable: false, stopable: true },
      global: { stubs: ['Icon'] }
    })
    expect(wrapperPrecedence.find('[data-testid="prompt-input-stop-btn"]').exists()).toBe(false)
  })
})
