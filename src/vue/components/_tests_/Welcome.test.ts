import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Welcome from '../Welcome.vue'

describe('Welcome.vue', () => {
  test('renders title, description, and variant classes', () => {
    const wrapper = mount(Welcome, {
      props: {
        title: '你好，我是 Bobo AI',
        description: '我可以帮你编写代码与排查问题',
        variant: 'filled',
        align: 'center'
      },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.classes()).toContain('vk-welcome--filled')
    expect(wrapper.classes()).toContain('vk-welcome--center')
    expect(wrapper.find('[data-testid="welcome-title"]').text()).toBe('你好，我是 Bobo AI')
    expect(wrapper.find('[data-testid="welcome-description"]').text()).toBe('我可以帮你编写代码与排查问题')
  })

  test('renders extra and default slots', () => {
    const wrapper = mount(Welcome, {
      props: { title: 'Hi' },
      slots: {
        extra: '<button>Docs</button>',
        default: '<div class="prompts-slot">Prompts</div>'
      },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('[data-testid="welcome-extra"]').text()).toBe('Docs')
    expect(wrapper.find('.prompts-slot').exists()).toBe(true)
  })
})
