import { describe, test, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Collapse from '../Collapse/Collapse.vue'
import CollapseItem from '../Collapse/CollapseItem.vue'
const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, disabledHeader: DOMWrapper<Element>

describe('Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(Collapse, {
      props: {
        modelValue: ['a'],
        onChange,
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
    headers = wrapper.findAll('.vk-collapse-item__header')
    contents = wrapper.findAll('.vk-collapse-item__wrapper')
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })
  test('测试基础结构以及对应文本', () => {
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    expect(firstHeader.text()).toBe('title a')
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
  })
  test('点击标题展开/关闭内容', async () => {
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })
  test('发送正确的事件', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
  test('disabled 的内容应该没有反应', async () => {
    onChange.mockClear()
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })
})
