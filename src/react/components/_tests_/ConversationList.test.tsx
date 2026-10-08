import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConversationList } from '../ConversationList'
import type { ConversationListRef } from '../../../core/components/conversation-list.react.types'

describe('ConversationList component', () => {
  test('basic render', () => {
    render(<ConversationList>content</ConversationList>)
    const list = screen.getByTestId('conversation-list')
    expect(list).toBeInTheDocument()
    expect(list).toHaveClass('vk-conversation-list')
    expect(list).toHaveAttribute('role', 'log')
  })

  test('shows empty when no children', () => {
    render(<ConversationList />)
    expect(screen.getByTestId('conversation-list-empty')).toHaveTextContent('暂无对话')
  })

  test('custom empty text', () => {
    render(<ConversationList emptyText="No messages" />)
    expect(screen.getByText('No messages')).toBeInTheDocument()
  })

  test('shows loading indicator', () => {
    render(<ConversationList loadingMore>content</ConversationList>)
    expect(screen.getByTestId('conversation-list-loading')).toBeInTheDocument()
  })

  test('applies max height', () => {
    render(<ConversationList maxHeight="500px">content</ConversationList>)
    expect(screen.getByTestId('conversation-list')).toHaveStyle({ maxHeight: '500px' })
  })

  test('exposes scroll helpers', () => {
    const ref = createRef<ConversationListRef>()
    render(<ConversationList ref={ref}>content</ConversationList>)
    expect(ref.current?.scrollToBottom).toBeDefined()
    expect(ref.current?.getElement()).toBe(screen.getByTestId('conversation-list'))
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
      const { unmount } = render(
        <ConversationList>
          <div>Message</div>
        </ConversationList>
      )

      const el = screen.getByTestId('conversation-list')
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

      el.dispatchEvent(new Event('scroll'))

      scrollHeight = 450
      const roInstances = (globalThis.ResizeObserver as any).instances
      roInstances.forEach((ro: any) => ro.trigger())

      await new Promise(r => requestAnimationFrame(r))
      await new Promise(r => setTimeout(r, 20))

      expect(scrollTop).toBe(450)
      unmount()
    })

    test('does not auto-scroll to bottom when user has scrolled up', async () => {
      const { unmount } = render(
        <ConversationList>
          <div>Message</div>
        </ConversationList>
      )

      const el = screen.getByTestId('conversation-list')
      let scrollHeight = 500
      let scrollTop = 50
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

      el.dispatchEvent(new Event('scroll'))

      scrollHeight = 700
      const roInstances = (globalThis.ResizeObserver as any).instances
      roInstances.forEach((ro: any) => ro.trigger())

      await new Promise(r => requestAnimationFrame(r))
      await new Promise(r => setTimeout(r, 20))

      expect(scrollTop).toBe(50)
      unmount()
    })

    test('preserves anchor using (oldScrollTop + heightDiff) when prepending history messages', async () => {
      const { unmount } = render(
        <ConversationList>
          <div id="first-msg">First message</div>
        </ConversationList>
      )

      const el = screen.getByTestId('conversation-list')
      let scrollHeight = 300
      let scrollTop = 15
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

      el.dispatchEvent(new Event('scroll'))

      const contentEl = el.querySelector('.vk-conversation-list__content')!
      const newMsg = document.createElement('div')
      newMsg.textContent = 'Prepended message'
      contentEl.insertBefore(newMsg, contentEl.firstChild)
      scrollHeight = 500

      await new Promise(r => setTimeout(r, 50))

      expect(scrollTop).toBe(215)
      unmount()
    })
  })
})
