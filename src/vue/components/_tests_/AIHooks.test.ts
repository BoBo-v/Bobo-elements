import { describe, test, expect } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useStreamBuffer } from '../../hooks/useStreamBuffer'
import { useAIChat } from '../../hooks/useAIChat'

describe('Vue AI hooks', () => {
  test('useStreamBuffer smooths chunks and finishes cleanly', async () => {
    let bufferApi!: ReturnType<typeof useStreamBuffer>
    const Host = defineComponent({
      setup() {
        bufferApi = useStreamBuffer({ speed: 5, interval: 16 })
        return {}
      },
      template: '<div />'
    })
    mount(Host)
    bufferApi.push('Hello ')
    bufferApi.push('World!')
    expect(bufferApi.targetText.value).toBe('Hello World!')
    bufferApi.finish()
    expect(bufferApi.displayText.value).toBe('Hello World!')
    expect(bufferApi.isStreaming.value).toBe(false)
  })

  test('useAIChat manages send, streaming chunks, and retry', async () => {
    let chatApi!: ReturnType<typeof useAIChat>
    let attempt = 0
    const Host = defineComponent({
      setup() {
        chatApi = useAIChat({
          request: async (_msgs, { appendChunk }) => {
            attempt++
            if (attempt === 1) throw new Error('network error')
            appendChunk('Hi ')
            appendChunk('there')
          }
        })
        return {}
      },
      template: '<div />'
    })
    mount(Host)
    await chatApi.send('Hello')
    expect(chatApi.messages.value).toHaveLength(2)
    expect(chatApi.messages.value[1].status).toBe('error')

    await chatApi.retry()
    expect(chatApi.messages.value[1].status).toBe('sent')
    expect(chatApi.messages.value[1].content).toBe('Hi there')
  })
})
