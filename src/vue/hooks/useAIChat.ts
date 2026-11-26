import { ref, onUnmounted } from 'vue'
import type { AIChatMessage, AIChatRequestHandler } from '../../core/components/ai-chat.types'

export interface UseAIChatOptions {
  initialMessages?: AIChatMessage[]
  request: AIChatRequestHandler
}

/**
 * 管理 AI 多轮对话消息流、Abort 中止与重试的轻量 Composable
 */
export function useAIChat(options: UseAIChatOptions) {
  const messages = ref<AIChatMessage[]>(options.initialMessages ? [...options.initialMessages] : [])
  const input = ref('')
  const isStreaming = ref(false)
  const error = ref<Error | null>(null)
  let abortController: AbortController | null = null

  function createId() {
    return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  }

  function stop() {
    if (abortController) {
      abortController.abort()
      abortController = null
    }
    isStreaming.value = false
    const last = messages.value[messages.value.length - 1]
    if (last && last.status === 'streaming') {
      last.status = 'sent'
    }
  }

  async function runAssistantTurn(assistantId: string, historySnapshot: AIChatMessage[]) {
    abortController = new AbortController()
    isStreaming.value = true
    error.value = null

    const findTarget = () => messages.value.find(m => m.id === assistantId)

    try {
      const fullResult = await options.request(historySnapshot, {
        signal: abortController.signal,
        appendChunk: (chunk: string) => {
          const msg = findTarget()
          if (msg) msg.content += chunk
        },
        setReasoning: (text: string) => {
          const msg = findTarget()
          if (msg) msg.reasoning = text
        }
      })
      const msg = findTarget()
      if (msg) {
        if (typeof fullResult === 'string' && !msg.content) {
          msg.content = fullResult
        }
        msg.status = 'sent'
      }
    } catch (err: any) {
      const msg = findTarget()
      if (err?.name === 'AbortError') {
        if (msg) msg.status = 'sent'
      } else {
        const errObj = err instanceof Error ? err : new Error(String(err || '请求失败'))
        error.value = errObj
        if (msg) {
          msg.status = 'error'
          msg.errorMessage = errObj.message
        }
      }
    } finally {
      abortController = null
      isStreaming.value = false
    }
  }

  async function send(content?: string) {
    const text = (content ?? input.value).trim()
    if (!text || isStreaming.value) return

    if (content === undefined) input.value = ''

    const userMsg: AIChatMessage = {
      id: createId(),
      role: 'user',
      content: text,
      status: 'sent',
      timestamp: Date.now()
    }
    const assistantId = createId()
    const assistantMsg: AIChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      status: 'streaming',
      timestamp: Date.now()
    }

    const historySnapshot = [...messages.value, userMsg]
    messages.value = [...historySnapshot, assistantMsg]
    await runAssistantTurn(assistantId, historySnapshot)
  }

  async function retry(messageId?: string) {
    if (isStreaming.value) return
    const targetIdx = messageId
      ? messages.value.findIndex(m => m.id === messageId)
      : messages.value.length - 1
    if (targetIdx < 0) return

    const target = messages.value[targetIdx]
    if (target.role !== 'assistant') return

    target.content = ''
    target.reasoning = ''
    target.errorMessage = undefined
    target.status = 'streaming'

    const historySnapshot = messages.value.slice(0, targetIdx)
    await runAssistantTurn(target.id, historySnapshot)
  }

  function clear() {
    stop()
    messages.value = []
    error.value = null
  }

  onUnmounted(stop)

  return {
    messages,
    input,
    isStreaming,
    error,
    send,
    stop,
    retry,
    clear
  }
}
