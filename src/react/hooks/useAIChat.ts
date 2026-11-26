import { useState, useRef, useCallback, useEffect } from 'react'
import type { AIChatMessage, AIChatRequestHandler } from '../../core/components/ai-chat.types'

export interface UseAIChatOptions {
  initialMessages?: AIChatMessage[]
  request: AIChatRequestHandler
}

/**
 * 管理 AI 多轮对话消息流、Abort 中止与重试的轻量 React Hook
 */
export function useAIChat(options: UseAIChatOptions) {
  const [messages, setMessages] = useState<AIChatMessage[]>(() =>
    options.initialMessages ? [...options.initialMessages] : []
  )
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const messagesRef = useRef<AIChatMessage[]>(messages)
  messagesRef.current = messages
  const isStreamingRef = useRef(false)
  const requestRef = useRef(options.request)
  requestRef.current = options.request
  const abortRef = useRef<AbortController | null>(null)

  const createId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  const stop = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
    isStreamingRef.current = false
    setIsStreaming(false)
    setMessages(prev =>
      prev.map((m, i) =>
        i === prev.length - 1 && m.status === 'streaming' ? { ...m, status: 'sent' } : m
      )
    )
  }, [])

  const runAssistantTurn = useCallback(async (assistantId: string, historySnapshot: AIChatMessage[]) => {
    const controller = new AbortController()
    abortRef.current = controller
    isStreamingRef.current = true
    setIsStreaming(true)
    setError(null)

    const patchAssistant = (updater: (msg: AIChatMessage) => AIChatMessage) => {
      setMessages(prev => prev.map(m => (m.id === assistantId ? updater(m) : m)))
    }

    try {
      const fullResult = await requestRef.current(historySnapshot, {
        signal: controller.signal,
        appendChunk: (chunk: string) => {
          patchAssistant(m => ({ ...m, content: m.content + chunk }))
        },
        setReasoning: (text: string) => {
          patchAssistant(m => ({ ...m, reasoning: text }))
        },
      })
      patchAssistant(m => ({
        ...m,
        content: typeof fullResult === 'string' && !m.content ? fullResult : m.content,
        status: 'sent',
      }))
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        patchAssistant(m => ({ ...m, status: 'sent' }))
      } else {
        const errObj = err instanceof Error ? err : new Error(String(err || '请求失败'))
        setError(errObj)
        patchAssistant(m => ({ ...m, status: 'error', errorMessage: errObj.message }))
      }
    } finally {
      abortRef.current = null
      isStreamingRef.current = false
      setIsStreaming(false)
    }
  }, [])

  const send = useCallback(async (content?: string) => {
    const text = (content ?? input).trim()
    if (!text || isStreamingRef.current) return
    if (content === undefined) setInput('')

    const userMsg: AIChatMessage = {
      id: createId(),
      role: 'user',
      content: text,
      status: 'sent',
      timestamp: Date.now(),
    }
    const assistantId = createId()
    const assistantMsg: AIChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      status: 'streaming',
      timestamp: Date.now(),
    }

    const historySnapshot = [...messagesRef.current, userMsg]
    setMessages([...historySnapshot, assistantMsg])
    await runAssistantTurn(assistantId, historySnapshot)
  }, [input, runAssistantTurn])

  const retry = useCallback(async (messageId?: string) => {
    if (isStreamingRef.current) return
    const list = messagesRef.current
    const targetIdx = messageId ? list.findIndex(m => m.id === messageId) : list.length - 1
    if (targetIdx < 0) return

    const target = list[targetIdx]
    if (target.role !== 'assistant') return

    const historySnapshot = list.slice(0, targetIdx)
    setMessages(prev =>
      prev.map((m, i) =>
        i === targetIdx
          ? { ...m, content: '', reasoning: '', errorMessage: undefined, status: 'streaming' }
          : m
      )
    )
    await runAssistantTurn(target.id, historySnapshot)
  }, [runAssistantTurn])

  const clear = useCallback(() => {
    stop()
    setMessages([])
    setError(null)
  }, [stop])

  useEffect(() => stop, [stop])

  return {
    messages,
    setMessages,
    input,
    setInput,
    isStreaming,
    error,
    send,
    stop,
    retry,
    clear,
  }
}
