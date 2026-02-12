import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Alert from '../Alert.vue'
import Icon from '../Icon.vue'

describe('Alert.vue', () => {
    test('renders content and slot', () => {
        const wrapper = mount(Alert, {
            props: {
                type: 'success',
                content: 'Hello Alert'
            },
            slots: {
                default: 'slot content'
            }
        })

        const alert = wrapper.find('.vk-alert')
        expect(alert.exists()).toBe(true)
        expect(alert.classes()).toContain('vk-alert__success')
        expect(alert.classes()).toContain('vk-alert__light')
        expect(alert.text()).toContain('Hello Alert')
        expect(alert.text()).toContain('slot content')
    })

    test('closable alert hides on icon click and emits close', async () => {
        const wrapper = mount(Alert, {
            props: {
                type: 'info',
                closable: true
            },
            global: {
                stubs: {
                    Icon
                }
            }
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)

        await icon.trigger('click')

        // Alert 已隐藏
        expect(wrapper.find('.vk-alert').exists()).toBe(false)

        // close 事件触发
        expect(wrapper.emitted()).toHaveProperty('close')
    })

    test('hide method works and emits close', async () => {
        const wrapper = mount(Alert, {
            props: { type: 'warning', closable: true }
        })

        wrapper.vm.hide()
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.vk-alert').exists()).toBe(false)
        expect(wrapper.emitted()).toHaveProperty('close')
    })

    test('non-closable alert does not render close button', () => {
        const wrapper = mount(Alert, {
            props: { type: 'danger', closable: false }
        })

        expect(wrapper.find('.vk-alert__close').exists()).toBe(false)
    })
})
