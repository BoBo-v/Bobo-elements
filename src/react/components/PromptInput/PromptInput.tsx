import { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef, memo } from 'react'
import type { KeyboardEvent } from 'react'
import type { PromptInputProps, PromptInputRef } from '../../../core/components/prompt-input.react.types'
import Icon from '../Icon'
import '../../../components/PromptInput/style.css'

export const PromptInput = memo(forwardRef<PromptInputRef, PromptInputProps>(function PromptInput({
  value: controlledValue,
  placeholder = '输入消息...',
  disabled = false,
  maxLength,
  rows = 1,
  autoResize = true,
  maxRows = 6,
  showCount = false,
  streaming = false,
  streamingText = 'AI 正在回复...',
  hintText = 'Enter 发送 / Shift+Enter 换行',
  sendAriaLabel = '发送',
  children,
  onChange,
  onSubmit,
  onKeyDown,
}: PromptInputProps, ref) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [innerValue, setInnerValue] = useState(controlledValue || '')

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInnerValue(controlledValue)
    }
  }, [controlledValue])

  const doAutoResize = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 21
    const maxHeight = lineHeight * maxRows
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px'
  }, [maxRows])

  useEffect(() => {
    if (autoResize) doAutoResize()
  }, [innerValue, autoResize, doAutoResize])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setInnerValue(val)
    onChange?.(val)
  }, [onChange])

  const handleSubmit = useCallback(() => {
    const trimmed = innerValue.trim()
    if (trimmed && !disabled && !streaming) {
      onSubmit?.(trimmed)
    }
  }, [innerValue, disabled, streaming, onSubmit])

  const handleKeydown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown?.(e)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }, [onKeyDown, handleSubmit])

  const focus = useCallback(() => textareaRef.current?.focus(), [])
  const blur = useCallback(() => textareaRef.current?.blur(), [])
  const clear = useCallback(() => {
    setInnerValue('')
    onChange?.('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }, [onChange])

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    clear,
    textareaRef: textareaRef.current,
  }), [focus, blur, clear])

  const classes = [
    'vk-prompt-input',
    disabled ? 'is-disabled' : '',
    streaming ? 'is-streaming' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} data-testid="prompt-input">
      <textarea
        ref={textareaRef}
        className="vk-prompt-input__textarea"
        value={innerValue}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        aria-label={placeholder}
        data-testid="prompt-input-textarea"
        onChange={handleInput}
        onKeyDown={handleKeydown}
      />
      <div className="vk-prompt-input__footer">
        <div className="vk-prompt-input__actions">
          {streaming && <span className="vk-prompt-input__streaming-badge">{streamingText}</span>}
          {showCount && maxLength && (
            <span className={`vk-prompt-input__count${innerValue.length > maxLength ? ' is-exceeded' : ''}`}>
              {innerValue.length} / {maxLength}
            </span>
          )}
        </div>
        <div className="vk-prompt-input__actions">
          <span className="vk-prompt-input__hint">{hintText}</span>
          {children || (
            <button
              className="vk-prompt-input__send-btn"
              disabled={!innerValue.trim() || disabled || streaming}
              data-testid="prompt-input-send-btn"
              aria-label={sendAriaLabel}
              onClick={handleSubmit}
            >
              <Icon name="arrow-up" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}))
