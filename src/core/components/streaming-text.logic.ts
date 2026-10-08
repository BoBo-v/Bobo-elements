/**
 * Splits text into grapheme clusters.
 * Uses Intl.Segmenter when available for complete grapheme support (ZWJ emojis, skin tones, accents).
 * Gracefully falls back to Array.from for environments without Intl.Segmenter,
 * which guarantees surrogate pair safety (prevents orphaned surrogate code units).
 */
function splitGraphemes(text: string): string[] {
  if (!text) return []
  if (typeof Intl !== 'undefined' && typeof (Intl as any).Segmenter === 'function') {
    const segmenter = new (Intl as any).Segmenter(undefined, { granularity: 'grapheme' })
    const segments = segmenter.segment(text)
    return Array.from(segments, (s: any) => s.segment)
  }
  // Fallback: guarantees surrogate pairs are not split into isolated code units
  return Array.from(text)
}

export function createStreamingState() {
  let currentIndex = 0
  let prevText = ''
  let graphemes: string[] = []

  function onTextChange(newText: string): void {
    if (newText.startsWith(prevText)) {
      // append case: keep currentIndex
    } else {
      // reset case
      currentIndex = 0
    }
    prevText = newText
    graphemes = splitGraphemes(newText)
  }

  function tick(arg1?: number, arg2?: number): number {
    // Supports both tick(speed) and tick(targetLength, speed)
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
