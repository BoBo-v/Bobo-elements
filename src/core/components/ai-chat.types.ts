export interface AIChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  reasoning?: string
  status?: 'sending' | 'sent' | 'error' | 'streaming'
  errorMessage?: string
  timestamp?: number
}

export interface AIChatRequestContext {
  signal: AbortSignal
  appendChunk: (chunk: string) => void
  setReasoning: (text: string) => void
}

export type AIChatRequestHandler = (
  messages: AIChatMessage[],
  context: AIChatRequestContext
) => Promise<string | void>
