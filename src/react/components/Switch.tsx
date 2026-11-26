import React, { memo } from 'react';
import type { SwitchProps } from '../../core/components/switch.react.types';
import '../../components/Switch/style.css';

const Switch = memo(function Switch({
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
  const checked = modelValue === activeValue;

  const switchValue = () => {
    if (disabled) return;
    const newValue = checked ? inactiveValue : activeValue;
    onChange?.(newValue);
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
    >
      {name && (
        <input
          className="vk-switch__input"
          type="hidden"
          name={name}
          value={String(modelValue)}
        />
      )}
      <button
        id={id}
        type="button"
        role="switch"
        className="vk-switch__core"
        aria-checked={checked}
        disabled={disabled}
        onClick={switchValue}
      >
        {(activeText || inactiveText) && (
          <span className="vk-switch__core-inner">
            <span className="vk-switch__core-inner-text">
              {checked ? activeText : inactiveText}
            </span>
          </span>
        )}
        <span className="vk-switch__core-action" aria-hidden="true" />
      </button>
    </div>
  );
});

export default Switch;
