import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConversationList from '../ConversationList.vue'

describe('ConversationList.vue', () => {
  test('basic render', () => {
    const wrapper = mount(ConversationList)
    expect(wrapper.classes()).toContain('vk-conversation-list')
    expect(wrapper.attributes('role')).toBe('log')
    expect(wrapper.attributes('aria-live')).toBe('polite')
  })

  test('shows empty text when no content', () => {
    const wrapper = mount(ConversationList)
    expect(wrapper.find('[data-testid="conversation-list-empty"]').text()).toBe('暂无对话')
  })

  test('custom empty text', () => {
    const wrapper = mount(ConversationList, {
      props: { emptyText: 'No messages' }
    })
    expect(wrapper.find('[data-testid="conversation-list-empty"]').text()).toBe('No messages')
  })

  test('supports custom empty slot', () => {
    const wrapper = mount(ConversationList, {
      slots: { empty: '<div class="custom-welcome">Welcome!</div>' }
    })
    expect(wrapper.find('.custom-welcome').text()).toBe('Welcome!')
  })

  test('shows loading indicator', () => {
    const wrapper = mount(ConversationList, {
      props: { loadingMore: true }
    })
    expect(wrapper.find('[data-testid="conversation-list-loading"]').exists()).toBeTruthy()
  })

  test('applies max height', () => {
    const wrapper = mount(ConversationList, {
      props: { maxHeight: '500px' }
    })
    expect(wrapper.attributes('style')).toContain('max-height: 500px')
  })

  test('exposes scrollToBottom and getElement', () => {
    const wrapper = mount(ConversationList)
    expect(wrapper.vm.scrollToBottom).toBeDefined()
    expect(wrapper.vm.getElement).toBeDefined()
  })

  describe('scrolling behaviors', () => {
    let originalResizeObserver: any

    beforeEach(() => {
      originalResizeObserver = globalThis.ResizeObserver
      globalThis.ResizeObserver = class MockResizeObserver {
        static instances: MockResizeObserver[] = []
        callback: ResizeObserverCallback
        observedElements: Element[] = []

        constructor(cb: ResizeObserverCallback) {
          this.callback = cb
          MockResizeObserver.instances.push(this)
        }
        observe(el: Element) { this.observedElements.push(el) }
        unobserve(el: Element) { this.observedElements = this.observedElements.filter(e => e !== el) }
        disconnect() { this.observedElements = [] }
        trigger() { this.callback([], this as any) }
      } as any
    })

    afterEach(() => {
      globalThis.ResizeObserver = originalResizeObserver
    })

    test('streaming content growth keeps sticking to bottom when already near bottom', async () => {
      const wrapper = mount(ConversationList, {
        slots: {
          default: '<div class="msg">Hello</div>'
        },
        attachTo: document.body
      })

      const el = wrapper.find('[data-testid="conversation-list"]').element as HTMLElement
      let scrollHeight = 300
      let scrollTop = 100
      const clientHeight = 200

      Object.defineProperty(el, 'clientHeight', { get: () => clientHeight, configurable: true })
      Object.defineProperty(el, 'scrollHeight', { get: () => scrollHeight, configurable: true })
      Object.defineProperty(el, 'scrollTop', {
        get: () => scrollTop,
        set: (v) => { scrollTop = v },
        configurable: true
      })
      el.scrollTo = (options?: any) => {
        if (typeof options === 'object') scrollTop = options.top ?? scrollTop
      }

      // Initial state is near bottom (300 - 100 - 200 = 0 < 50)
      // Trigger scroll event to ensure stickiness state is bottom
      wrapper.trigger('scroll')

      // Streaming: content grows
      scrollHeight = 450
      // Simulate resize observer on content or mutation
      const roInstances = (globalThis.ResizeObserver as any).instances
      roInstances.forEach((ro: any) => ro.trigger())

      // Wait for rAF / nextTick
      await new Promise(r => requestAnimationFrame(r))
      await new Promise(r => setTimeout(r, 20))

      // Should automatically stick to bottom (scrollHeight)
      expect(scrollTop).toBe(450)
      wrapper.unmount()
    })

    test('does not auto-scroll to bottom when user has scrolled up', async () => {
      const wrapper = mount(ConversationList, {
        slots: {
          default: '<div class="msg">Hello</div>'
        },
        attachTo: document.body
      })

      const el = wrapper.find('[data-testid="conversation-list"]').element as HTMLElement
      let scrollHeight = 500
      let scrollTop = 50 // Far from bottom (500 - 50 - 200 = 250 > 50)
      const clientHeight = 200

      Object.defineProperty(el, 'clientHeight', { get: () => clientHeight, configurable: true })
      Object.defineProperty(el, 'scrollHeight', { get: () => scrollHeight, configurable: true })
      Object.defineProperty(el, 'scrollTop', {
        get: () => scrollTop,
        set: (v) => { scrollTop = v },
        configurable: true
      })
      el.scrollTo = (options?: any) => {
        if (typeof options === 'object') scrollTop = options.top ?? scrollTop
      }

      // User scrolls up
      wrapper.trigger('scroll')

      // Streaming arrives: scrollHeight increases
      scrollHeight = 700
      const roInstances = (globalThis.ResizeObserver as any).instances
      roInstances.forEach((ro: any) => ro.trigger())

      await new Promise(r => requestAnimationFrame(r))
      await new Promise(r => setTimeout(r, 20))

      // scrollTop should NOT snap to 700, should stay at 50
      expect(scrollTop).toBe(50)
      wrapper.unmount()
    })

    test('preserves anchor using (oldScrollTop + heightDiff) when prepending history messages', async () => {
      const wrapper = mount(ConversationList, {
        slots: {
          default: '<div class="msg">Initial</div>'
        },
        attachTo: document.body
      })

      const el = wrapper.find('[data-testid="conversation-list"]').element as HTMLElement
      let scrollHeight = 300
      let scrollTop = 15 // User is viewing near top (15 <= SCROLL_THRESHOLD)
      const clientHeight = 200

      Object.defineProperty(el, 'clientHeight', { get: () => clientHeight, configurable: true })
      Object.defineProperty(el, 'scrollHeight', { get: () => scrollHeight, configurable: true })
      Object.defineProperty(el, 'scrollTop', {
        get: () => scrollTop,
        set: (v) => { scrollTop = v },
        configurable: true
      })
      el.scrollTo = (options?: any) => {
        if (typeof options === 'object') scrollTop = options.top ?? scrollTop
      }

      // User scrolled to top area
      wrapper.trigger('scroll')

      // History messages prepended: new node added, scrollHeight increases by 200 (to 500)
      const contentEl = el.querySelector('.vk-conversation-list__content')!
      const newMsg = document.createElement('div')
      newMsg.textContent = 'History message'
      contentEl.insertBefore(newMsg, contentEl.firstChild)
      scrollHeight = 500

      // Wait for mutation observer & rAF
      await new Promise(r => setTimeout(r, 50))

      // Expect anchor compensated: oldScrollTop (15) + (500 - 300) = 215
      expect(scrollTop).toBe(215)
      wrapper.unmount()
    })
  })
})

