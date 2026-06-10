export function createStreamingState() {
  let currentIndex = 0
  let prevText = ''

  function tick(targetLength: number, speed: number): number {
    currentIndex = Math.min(currentIndex + Math.max(1, speed), targetLength)
    return currentIndex
  }

  function onTextChange(newText: string): void {
    if (newText.startsWith(prevText)) {
      // append case: keep currentIndex
    } else {
      // reset case
      currentIndex = 0
    }
    prevText = newText
  }

  function reset(): void {
    currentIndex = 0
    prevText = ''
  }

  function getDisplayText(fullText: string): string {
    return fullText.slice(0, currentIndex)
  }

  function isComplete(fullText: string): boolean {
    return currentIndex >= fullText.length
  }

  function getCurrentIndex(): number {
    return currentIndex
  }

  function finish(targetLength: number): number {
    currentIndex = targetLength
    return currentIndex
  }

  return { tick, onTextChange, reset, getDisplayText, isComplete, getCurrentIndex, finish }
}
