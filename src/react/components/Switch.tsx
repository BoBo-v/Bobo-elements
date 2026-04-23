import React, { useRef, useEffect } from 'react';
import type { SwitchProps } from '../../core/components/switch.react.types';
import '../../components/Switch/style.css';

export default function Switch({
  modelValue,
  disabled = false,
  activeText,
  inactiveText,
  activeValue = true,
  inactiveValue = false,
  name,
  id,
  size,
  onChange,
}: SwitchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const checked = modelValue === activeValue;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = checked;
    }
  }, [checked]);

  const switchValue = () => {
    if (disabled) return;
    const newValue = checked ? inactiveValue : activeValue;
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      switchValue();
    }
  };

  return (
    <div
      className={[
        'vk-switch',
        size ? `vk-switch--${size}` : '',
        disabled ? 'is-disabled' : '',
        checked ? 'is-checked' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={switchValue}
    >
      <input
        className="vk-swtich__input"
        type="checkbox"
        role="switch"
        ref={inputRef}
        id={id}
        name={name}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      <div className="vk-switch__core">
        <div className="vk-switch__core-inner">
          {(activeText || inactiveText) && (
            <span className="vk-switch__core-inner-text">
              {checked ? activeText : inactiveText}
            </span>
          )}
        </div>
        <div className="vk-switch__core-action" />
      </div>
    </div>
  );
}
