/**
 * 复用 Intl.Segmenter 单例（按 grapheme 粒度切分），避免长文本流式更新时反复创建实例。
 * 当运行环境不支持 Intl.Segmenter 时，降级为 Array.from 以保证代理对安全。
 */
let cachedSegmenter: any = null

function getSegmenter(): any {
  if (typeof Intl !== 'undefined' && typeof (Intl as any).Segmenter === 'function') {
    if (!cachedSegmenter) {
      cachedSegmenter = new (Intl as any).Segmenter(undefined, { granularity: 'grapheme' })
    }
    return cachedSegmenter
  }
  return null
}

function splitGraphemes(text: string): string[] {
  if (!text) return []
  const segmenter = getSegmenter()
  if (segmenter) {
    return Array.from(segmenter.segment(text), (s: any) => s.segment)
  }
  return Array.from(text)
}

export function createStreamingState() {
  let currentIndex = 0
  let prevText = ''
  let graphemes: string[] = []

  function onTextChange(newText: string): void {
    if (!newText) {
      currentIndex = 0
      prevText = ''
      graphemes = []
      return
    }

    if (prevText && newText.startsWith(prevText)) {
      // 增量追加优化：只对末尾最后一个字素簇与新增片段重新切分，兼顾 ZWJ/变音符边界正确性与 O(Δ) 性能
      const appended = newText.slice(prevText.length)
      if (appended) {
        if (graphemes.length > 0) {
          const tail = graphemes.pop()!
          const tailSegments = splitGraphemes(tail + appended)
          for (const seg of tailSegments) {
            graphemes.push(seg)
          }
        } else {
          graphemes = splitGraphemes(newText)
        }
      }
    } else {
      // 全量重置
      currentIndex = 0
      graphemes = splitGraphemes(newText)
    }
    prevText = newText
  }

  function tick(arg1?: number, arg2?: number): number {
    // 同时兼容 tick(speed) 与 tick(targetLength, speed)
    const speed = arg2 !== undefined ? arg2 : (arg1 !== undefined ? arg1 : 1)
    const targetLength = graphemes.length
    currentIndex = Math.min(currentIndex + Math.max(1, speed), targetLength)
    return currentIndex
  }

  function reset(): void {
    currentIndex = 0
    prevText = ''
    graphemes = []
  }

  function getDisplayText(fullText?: string): string {
    if (graphemes.length === 0 && fullText) {
      graphemes = splitGraphemes(fullText)
      prevText = fullText
    }
    return graphemes.slice(0, currentIndex).join('')
  }

  function isComplete(fullText?: string): boolean {
    const total = graphemes.length || (fullText ? splitGraphemes(fullText).length : 0)
    return currentIndex >= total
  }

  function getCurrentIndex(): number {
    return currentIndex
  }

  function finish(targetLength?: number): number {
    currentIndex = targetLength !== undefined && targetLength < graphemes.length
      ? targetLength
      : graphemes.length
    return currentIndex
  }

  return { tick, onTextChange, reset, getDisplayText, isComplete, getCurrentIndex, finish }
}
