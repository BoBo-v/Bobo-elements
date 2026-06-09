import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TokenBadge from '../TokenBadge.vue'

describe('TokenBadge.vue', () => {
  test('basic render', () => {
    const wrapper = mount(TokenBadge)
    expect(wrapper.classes()).toContain('vk-token-badge')
    expect(wrapper.classes()).toContain('vk-token-badge--normal')
    expect(wrapper.find('[data-testid="token-badge-value"]').text()).toBe('0')
    expect(wrapper.find('.vk-token-badge__prefix').text()).toBe('Tokens')
  })

  test('shows used value', () => {
    const wrapper = mount(TokenBadge, {
      props: { used: 1200 }
    })
    expect(wrapper.find('[data-testid="token-badge-value"]').text()).toBe('1.2K')
  })

  test('shows total when provided', () => {
    const wrapper = mount(TokenBadge, {
      props: { used: 500, total: 4000 }
    })
    expect(wrapper.find('[data-testid="token-badge-total"]').text()).toBe('/ 4.0K')
  })

  test('hides total when not provided', () => {
    const wrapper = mount(TokenBadge, {
      props: { used: 500 }
    })
    expect(wrapper.find('[data-testid="token-badge-total"]').exists()).toBeFalsy()
  })

  test('status variants', () => {
    const wrapperNormal = mount(TokenBadge, { props: { status: 'normal' } })
    expect(wrapperNormal.classes()).toContain('vk-token-badge--normal')

    const wrapperWarning = mount(TokenBadge, { props: { status: 'warning' } })
    expect(wrapperWarning.classes()).toContain('vk-token-badge--warning')

    const wrapperDanger = mount(TokenBadge, { props: { status: 'danger' } })
    expect(wrapperDanger.classes()).toContain('vk-token-badge--danger')
  })

  test('custom prefix', () => {
    const wrapper = mount(TokenBadge, {
      props: { prefix: '字符' }
    })
    expect(wrapper.find('.vk-token-badge__prefix').text()).toBe('字符')
  })

  test('formats millions', () => {
    const wrapper = mount(TokenBadge, {
      props: { used: 1500000, total: 2000000 }
    })
    expect(wrapper.find('[data-testid="token-badge-value"]').text()).toBe('1.5M')
    expect(wrapper.find('[data-testid="token-badge-total"]').text()).toBe('/ 2.0M')
  })
})
