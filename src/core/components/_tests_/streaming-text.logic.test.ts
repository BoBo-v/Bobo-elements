import { describe, test, expect } from 'vitest'
import { createStreamingState } from '../streaming-text.logic'

describe('createStreamingState Unicode grapheme clustering', () => {
  test('handles surrogate pairs (single emoji) without splitting code units', () => {
    const state = createStreamingState()
    const text = '😀😁'
    state.onTextChange(text)

    // Tick 1 grapheme
    state.tick(1)
    expect(state.getDisplayText()).toBe('😀')
    expect(state.isComplete()).toBe(false)

    // Tick 2 graphemes
    state.tick(1)
    expect(state.getDisplayText()).toBe('😀😁')
    expect(state.isComplete()).toBe(true)
  })

  test('handles ZWJ compound emoji and skin tones as intact grapheme clusters', () => {
    const state = createStreamingState()
    // Family: 👨‍👩‍👧‍👦
    const familyEmoji = '👨‍👩‍👧‍👦'
    state.onTextChange(familyEmoji)

    state.tick(1)
    expect(state.getDisplayText()).toBe('👨‍👩‍👧‍👦')
    expect(state.isComplete()).toBe(true)

    // Thumbs up with skin tone: 👍🏽
    const state2 = createStreamingState()
    const thumbsUpSkinTone = '👍🏽'
    state2.onTextChange(thumbsUpSkinTone)

    state2.tick(1)
    expect(state2.getDisplayText()).toBe('👍🏽')
    expect(state2.isComplete()).toBe(true)
  })

  test('handles combining accent marks without separating base char from accent', () => {
    const state = createStreamingState()
    const combiningChar = 'e\u0301' // é formed by 'e' + combining acute accent
    state.onTextChange(combiningChar)

    state.tick(1)
    expect(state.getDisplayText()).toBe('e\u0301')
    expect(state.isComplete()).toBe(true)
  })

  test('preserves progress when text is appended incrementally and re-segments correctly', () => {
    const state = createStreamingState()
    state.onTextChange('Hi 😀')
    // Length in graphemes: 'H', 'i', ' ', '😀' = 4 graphemes

    state.tick(2) // output 'Hi'
    expect(state.getDisplayText()).toBe('Hi')
    expect(state.getCurrentIndex()).toBe(2)

    // Streaming append
    state.onTextChange('Hi 😀 there')
    expect(state.getCurrentIndex()).toBe(2)
    expect(state.getDisplayText()).toBe('Hi')

    state.tick(2) // output 'Hi 😀'
    expect(state.getDisplayText()).toBe('Hi 😀')

    state.finish()
    expect(state.getDisplayText()).toBe('Hi 😀 there')
    expect(state.isComplete()).toBe(true)
  })

  test('resets currentIndex when new text is not a prefix continuation', () => {
    const state = createStreamingState()
    state.onTextChange('Hello')
    state.tick(3)
    expect(state.getDisplayText()).toBe('Hel')

    state.onTextChange('Different')
    expect(state.getCurrentIndex()).toBe(0)
    expect(state.getDisplayText()).toBe('')
  })

  test('falls back gracefully when Intl.Segmenter is unavailable (surrogate pair safety)', () => {
    const originalSegmenter = (Intl as any).Segmenter
    try {
      // Temporarily remove Intl.Segmenter to test fallback
      (Intl as any).Segmenter = undefined

      const state = createStreamingState()
      const text = '😀😁'
      state.onTextChange(text)

      // Fallback with Array.from should still not break surrogate pairs
      state.tick(1)
      expect(state.getDisplayText()).toBe('😀')
      state.tick(1)
      expect(state.getDisplayText()).toBe('😀😁')
    } finally {
      (Intl as any).Segmenter = originalSegmenter
    }
  })

  test('merges ZWJ or combining marks across incremental append boundary', () => {
    const state = createStreamingState()
    state.onTextChange('e')
    state.onTextChange('e\u0301!')
    state.tick(1)
    expect(state.getDisplayText()).toBe('e\u0301')
    state.tick(1)
    expect(state.getDisplayText()).toBe('e\u0301!')
    expect(state.isComplete()).toBe(true)
  })
})
