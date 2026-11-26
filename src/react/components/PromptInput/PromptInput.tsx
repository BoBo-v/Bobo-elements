import { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef, memo } from 'react'
import type { KeyboardEvent, ClipboardEvent, DragEvent } from 'react'
import type { PromptInputProps, PromptInputRef } from '../../../core/components/prompt-input.react.types'
import Icon from '../Icon'
import '../../../components/PromptInput/style.css'

export const PromptInput = memo(forwardRef<PromptInputRef, PromptInputProps>(function PromptInput({
  value: controlledValue,
  placeholder = '输入消息...',
  disabled = false,
  disableInputWhenStreaming = false,
  maxLength,
  rows = 1,
  autoResize = true,
  maxRows = 6,
  showCount = false,
  id,
  ariaLabel,
  ariaLabelledby,
  streaming = false,
  streamingText = 'AI 正在回复...',
  stoppable: propStoppable,
  stopable: propStopable,
  stopText = '停止',
  stopAriaLabel = '停止生成',
  hintText = 'Enter 发送 / Shift+Enter 换行',
  sendAriaLabel = '发送',
  size = 'default',
  variant = 'default',
  clearable = false,
  clearAriaLabel = '清除',
  className,
  style,
  header,
  toolbar,
  actions,
  children,
  onChange,
  onSubmit,
  onStop,
  onKeyDown,
  onPasteFiles,
  onDropFiles,
}: PromptInputProps, ref) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const isComposingRef = useRef(false)
  const [innerValue, setInnerValue] = useState(controlledValue || '')

  const effectiveStoppable = propStoppable !== undefined
    ? propStoppable
    : (propStopable !== undefined ? propStopable : false)

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
    if (e.defaultPrevented) return
    const isImeComposing = isComposingRef.current || e.nativeEvent.isComposing || (e.nativeEvent as any).keyCode === 229
    if (e.key === 'Enter' && !e.shiftKey && !isImeComposing) {
      e.preventDefault()
      handleSubmit()
    }
  }, [onKeyDown, handleSubmit])

  const handlePaste = useCallback((e: ClipboardEvent<HTMLTextAreaElement>) => {
    const files = Array.from(e.clipboardData?.files || [])
    if (files.length > 0) {
      onPasteFiles?.(files)
    }
  }, [onPasteFiles])

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    const files = Array.from(e.dataTransfer?.files || [])
    if (files.length > 0) {
      e.preventDefault()
      onDropFiles?.(files)
    }
  }, [onDropFiles])

  const handleCompositionStart = useCallback(() => {
    isComposingRef.current = true
  }, [])

  const handleCompositionEnd = useCallback(() => {
    isComposingRef.current = false
  }, [])

  const focus = useCallback(() => textareaRef.current?.focus(), [])
  const blur = useCallback(() => textareaRef.current?.blur(), [])
  const getElement = useCallback(() => textareaRef.current, [])
  const clear = useCallback(() => {
    setInnerValue('')
    onChange?.('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }, [onChange])

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    clear,
    getElement,
    textareaRef: textareaRef.current,
  }), [focus, blur, clear, getElement])

  const isTextareaDisabled = disabled || (streaming && disableInputWhenStreaming)
  const customActions = actions ?? children

  const classes = [
    'vk-prompt-input',
    `vk-prompt-input--${size}`,
    `vk-prompt-input--${variant}`,
    disabled ? 'is-disabled' : '',
    streaming ? 'is-streaming' : '',
    isTextareaDisabled ? 'is-input-disabled' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} style={style} data-testid="prompt-input" onDrop={handleDrop}>
      {header && (
        <div className="vk-prompt-input__header" data-testid="prompt-input-header">
          {header}
        </div>
      )}
      <textarea
        ref={textareaRef}
        className="vk-prompt-input__textarea"
        id={id}
        value={innerValue}
        placeholder={placeholder}
        disabled={isTextareaDisabled}
        maxLength={maxLength}
        rows={rows}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        data-testid="prompt-input-textarea"
        onChange={handleInput}
        onKeyDown={handleKeydown}
        onPaste={handlePaste}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <div className="vk-prompt-input__footer">
        <div className="vk-prompt-input__actions">
          {toolbar}
          {streaming && <span className="vk-prompt-input__streaming-badge">{streamingText}</span>}
          {showCount && maxLength && (
            <span className={`vk-prompt-input__count${innerValue.length > maxLength ? ' is-exceeded' : ''}`}>
              {innerValue.length} / {maxLength}
            </span>
          )}
        </div>
        <div className="vk-prompt-input__actions">
          <span className="vk-prompt-input__hint">{hintText}</span>
          {clearable && innerValue && (
            <button
              type="button"
              className="vk-prompt-input__clear-btn"
              data-testid="prompt-input-clear-btn"
              aria-label={clearAriaLabel}
              disabled={disabled || streaming}
              onClick={clear}
            >
              <Icon name="xmark" />
            </button>
          )}
          {customActions || (streaming && effectiveStoppable ? (
            <button
              type="button"
              className="vk-prompt-input__stop-btn"
              data-testid="prompt-input-stop-btn"
              aria-label={stopAriaLabel}
              disabled={disabled}
              onClick={onStop}
            >
              {stopText}
            </button>
          ) : (
            <button
              type="button"
              className="vk-prompt-input__send-btn"
              disabled={!innerValue.trim() || disabled || streaming}
              data-testid="prompt-input-send-btn"
              aria-label={sendAriaLabel}
              onClick={handleSubmit}
            >
              <Icon name="arrow-up" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}))
