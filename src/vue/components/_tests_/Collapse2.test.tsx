import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Collapse from '../Collapse/Collapse.vue'
import CollapseItem from '../Collapse/CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a'],
      },
      slots: {
        default: () => [
          h(CollapseItem, { name: 'a', title: 'title a' }, { default: () => 'content a' }),
          h(CollapseItem, { name: 'b', title: 'title b' }, { default: () => 'content b' }),
          h(CollapseItem, { name: 'c', title: 'title c', disabled: true }, { default: () => 'content c' }),
        ],
      },
      global: {
        stubs: ['Icon'],
      },
      attachTo: document.body,
    })
    const headers = wrapper.findAll('.vk-collapse-item__header')
    const contents = wrapper.findAll('.vk-collapse-item__wrapper')

    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')

    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')

    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
    expect(wrapper.emitted()).toHaveProperty('change')
    const changeEvent = wrapper.emitted('change') as any[]
    expect(changeEvent).toHaveLength(2)

    expect(changeEvent[0]).toEqual([[]])
    expect(changeEvent[1]).toEqual([['b']])
    // disabled
    const disableHeader = headers[2]
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})
