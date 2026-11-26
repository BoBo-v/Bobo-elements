import { renderHook, act } from '@testing-library/react'
import { useStreamBuffer } from '../../hooks/useStreamBuffer'
import { useAIChat } from '../../hooks/useAIChat'

describe('React AI hooks', () => {
  test('useStreamBuffer buffers chunks and finishes', () => {
    const { result } = renderHook(() => useStreamBuffer({ speed: 4, interval: 16 }))
    act(() => {
      result.current.push('Hello ')
      result.current.push('React')
    })
    expect(result.current.targetText).toBe('Hello React')
    act(() => {
      result.current.finish()
    })
    expect(result.current.displayText).toBe('Hello React')
    expect(result.current.isStreaming).toBe(false)
  })

  test('useAIChat manages send and retry flow', async () => {
    let attempt = 0
    const { result } = renderHook(() =>
      useAIChat({
        request: async (_msgs, { appendChunk }) => {
          attempt++
          if (attempt === 1) throw new Error('timeout')
          appendChunk('Done')
        },
      })
    )

    await act(async () => {
      await result.current.send('Ping')
    })
    expect(result.current.messages).toHaveLength(2)
    expect(result.current.messages[1].status).toBe('error')

    await act(async () => {
      await result.current.retry()
    })
    expect(result.current.messages[1].status).toBe('sent')
    expect(result.current.messages[1].content).toBe('Done')
  })
})
