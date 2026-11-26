import { useState, useRef, useEffect, useMemo, memo } from 'react'
import type { CSSProperties } from 'react'
import type {
  ModelSelectorProps as CoreModelSelectorProps,
  ModelOption,
  ModelSelectorSize,
} from '../../../core/components/model-selector.types'
import Icon from '../Icon'
import '../../../components/ModelSelector/style.css'

export type { ModelOption, ModelSelectorSize }

export interface ModelSelectorProps extends Omit<CoreModelSelectorProps, 'modelValue'> {
  value?: string
  className?: string
  style?: CSSProperties
  onChange?: (id: string, model: ModelOption) => void
}

export const ModelSelector = memo(function ModelSelector({
  value,
  models = [],
  placeholder = '选择模型',
  disabled = false,
  size = 'default',
  className,
  style,
  onChange,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleOutside)
    return () => document.removeEventListener('click', handleOutside)
  }, [])

  const selectedModel = useMemo(() => models.find(m => m.id === value), [models, value])
  const rootClass = [
    'vk-model-selector',
    `vk-model-selector--${size}`,
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div ref={rootRef} className={rootClass} style={style} data-testid="model-selector">
      <button
        type="button"
        className="vk-model-selector__trigger"
        disabled={disabled}
        aria-expanded={open}
        data-testid="model-selector-trigger"
        onClick={() => setOpen(prev => !prev)}
      >
        <span className="vk-model-selector__current">
          {selectedModel?.icon && <Icon name={selectedModel.icon} />}
          <span>{selectedModel?.name || placeholder}</span>
          {selectedModel?.contextLength && (
            <span className="vk-model-selector__ctx">{selectedModel.contextLength}</span>
          )}
        </span>
        <Icon name="chevron-down" />
      </button>

      {open && (
        <div className="vk-model-selector__menu" data-testid="model-selector-menu">
          {models.map((model) => (
            <button
              key={model.id}
              type="button"
              className={`vk-model-selector__option${model.id === value ? ' is-selected' : ''}`}
              disabled={model.disabled}
              data-testid="model-selector-option"
              onClick={() => {
                if (model.disabled) return
                onChange?.(model.id, model)
                setOpen(false)
              }}
            >
              <div className="vk-model-selector__option-head">
                <span>{model.name}</span>
                {model.contextLength && (
                  <span className="vk-model-selector__ctx">{model.contextLength}</span>
                )}
              </div>
              {model.description && (
                <div className="vk-model-selector__option-desc">{model.description}</div>
              )}
              {model.tags && model.tags.length > 0 && (
                <div className="vk-model-selector__tags">
                  {model.tags.map(tag => (
                    <span key={tag} className="vk-model-selector__tag">{tag}</span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})
