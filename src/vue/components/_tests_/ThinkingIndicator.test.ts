import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ThinkingIndicator from '../ThinkingIndicator.vue'

describe('ThinkingIndicator.vue', () => {
  test('basic render with dots variant', () => {
    const wrapper = mount(ThinkingIndicator)
    expect(wrapper.classes()).toContain('vk-thinking-indicator')
    expect(wrapper.find('[data-testid]').exists()).toBeFalsy()
    expect(wrapper.find('.vk-thinking-indicator__dots').exists()).toBeTruthy()
    expect(wrapper.find('.vk-thinking-indicator__text').text()).toBe('正在思考...')
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.attributes('aria-live')).toBe('polite')
  })

  test('pulse variant', () => {
    const wrapper = mount(ThinkingIndicator, {
      props: { variant: 'pulse' }
    })
    expect(wrapper.find('.vk-thinking-indicator__pulse').exists()).toBeTruthy()
    expect(wrapper.find('.vk-thinking-indicator__dots').exists()).toBeFalsy()
  })

  test('wave variant', () => {
    const wrapper = mount(ThinkingIndicator, {
      props: { variant: 'wave' }
    })
    expect(wrapper.find('.vk-thinking-indicator__wave').exists()).toBeTruthy()
    expect(wrapper.findAll('.vk-thinking-indicator__wave-bar')).toHaveLength(5)
  })

  test('custom text', () => {
    const wrapper = mount(ThinkingIndicator, {
      props: { text: '加载中...' }
    })
    expect(wrapper.find('.vk-thinking-indicator__text').text()).toBe('加载中...')
  })

  test('no text when empty string', () => {
    const wrapper = mount(ThinkingIndicator, {
      props: { text: '' }
    })
    expect(wrapper.find('.vk-thinking-indicator__text').exists()).toBeFalsy()
  })

  test('size variants', () => {
    const wrapperSmall = mount(ThinkingIndicator, {
      props: { size: 'small' }
    })
    expect(wrapperSmall.classes()).toContain('vk-thinking-indicator--small')

    const wrapperLarge = mount(ThinkingIndicator, {
      props: { size: 'large' }
    })
    expect(wrapperLarge.classes()).toContain('vk-thinking-indicator--large')

    const wrapperDefault = mount(ThinkingIndicator, {
      props: { size: 'default' }
    })
    expect(wrapperDefault.classes()).not.toContain('vk-thinking-indicator--default')
  })

  test('custom aria-label', () => {
    const wrapper = mount(ThinkingIndicator, {
      props: { ariaLabel: 'Loading' }
    })
    expect(wrapper.attributes('aria-label')).toBe('Loading')
  })
})
