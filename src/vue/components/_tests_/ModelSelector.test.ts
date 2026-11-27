import { describe, test, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ModelSelector from '../ModelSelector.vue'
import { computeMenuPlacement } from '../../../core/components/model-selector.logic'

describe('ModelSelector.vue', () => {
  const models = [
    { id: 'gpt-4o', name: 'GPT-4o', contextLength: '128K', tags: ['Vision'] },
    { id: 'r1', name: 'DeepSeek R1', contextLength: '64K', tags: ['Thinking'] }
  ]

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('opens dropdown and selects model', async () => {
    const wrapper = mount(ModelSelector, {
      props: { modelValue: 'gpt-4o', models },
      global: { stubs: ['Icon'] }
    })
    expect(wrapper.find('[data-testid="model-selector-trigger"]').text()).toContain('GPT-4o')
    await wrapper.find('[data-testid="model-selector-trigger"]').trigger('click')
    const options = wrapper.findAll('[data-testid="model-selector-option"]')
    expect(options).toHaveLength(2)
    await options[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['r1'])
    expect(wrapper.emitted('change')?.[0]).toEqual([models[1]])
  })

  test('aligns menu right or clamps shiftX on narrow viewport', () => {
    expect(
      computeMenuPlacement({
        rootLeft: 200,
        rootRight: 360,
        rootTop: 80,
        rootBottom: 112,
        menuWidth: 268,
        menuHeight: 200,
        viewportWidth: 375,
        viewportHeight: 812
      })
    ).toEqual({ alignRight: true, dropUp: false, shiftX: 0 })

    expect(
      computeMenuPlacement({
        rootLeft: 120,
        rootRight: 220,
        rootTop: 80,
        rootBottom: 112,
        menuWidth: 268,
        menuHeight: 200,
        viewportWidth: 320,
        viewportHeight: 812
      })
    ).toEqual({ alignRight: false, dropUp: false, shiftX: -80 })
  })
})
