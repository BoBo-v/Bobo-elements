import React, { useState, useRef, useContext, forwardRef, useImperativeHandle } from 'react';
import type { InputProps, InputRef } from '../../core/components/input.react.types';
import Icon from './Icon';
import { FormItemContext } from './Form/FormItem';
import '../../components/Input/style.css';

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      type = 'text',
      modelValue,
      size,
      disabled = false,
      clearable = false,
      showPassword = false,
      placeholder,
      readonly: readonlyProp,
      autocomplete = 'off',
      autofocus,
      form,
      prefix,
      suffix,
      prepend,
      append,
      onInput,
      onChange,
      onFocus,
      onBlur,
      onClear,
      onKeyDown,
      'onUpdate:modelValue': onUpdateModelValue,
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const formItemContext = useContext(FormItemContext);

    useImperativeHandle(ref, () => ({
      ref: inputRef.current,
    }));

    const runValidation = (trigger?: string) => {
      formItemContext?.validate(trigger).catch((e: any) => console.log(e.errors));
    };

    const showClear = clearable && !disabled && !!modelValue && isFocus;
    const showPasswordArea = showPassword && !disabled && !!modelValue;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      onUpdateModelValue?.(val);
      onInput?.(val);
      runValidation('input');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      onChange?.(val);
      runValidation('change');
    };

    const handleFocus = (e: React.FocusEvent) => {
      setIsFocus(true);
      onFocus?.(e.nativeEvent as FocusEvent);
    };

    const handleBlur = (e: React.FocusEvent) => {
      setIsFocus(false);
      onBlur?.(e.nativeEvent as FocusEvent);
      runValidation('blur');
    };

    const clear = () => {
      onUpdateModelValue?.('');
      onClear?.();
      onInput?.('');
      onChange?.('');
    };

    const keepFocus = () => {
      setTimeout(() => inputRef.current?.focus(), 0);
    };

    const togglePasswordVisible = () => {
      setPasswordVisible(!passwordVisible);
    };

    const NOOP = (e: React.MouseEvent) => {
      e.preventDefault();
    };

    if (type === 'textarea') {
      return (
        <div
          className={[
            'vk-input',
            `vk-input--textarea`,
            size ? `vk-input--${size}` : '',
            disabled ? 'is-disabled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <textarea
            className="vk-textarea__wrapper"
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            disabled={disabled}
            readOnly={readonlyProp}
            autoComplete={autocomplete}
            placeholder={placeholder}
            autoFocus={autofocus}
            form={form}
            value={modelValue}
            onChange={handleInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </div>
      );
    }

    const computedType = showPassword ? (passwordVisible ? 'text' : 'password') : type;

    return (
      <div
        className={[
          'vk-input',
          size ? `vk-input--${size}` : '',
          disabled ? 'is-disabled' : '',
          prepend ? 'is-prepend' : '',
          append ? 'is-append' : '',
          prefix ? 'is-prefix' : '',
          suffix ? 'is-suffix' : '',
          isFocus ? 'is-focus' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {prepend && <div className="vk-input__prepend">{prepend}</div>}
        <div className={`vk-input__wrapper${isFocus ? ' is-focus' : ''}`}>
          {prefix && <span className="vk-input__prefix">{prefix}</span>}
          <input
            className="vk-input__inner"
            type={computedType}
            ref={inputRef as React.RefObject<HTMLInputElement>}
            disabled={disabled}
            readOnly={readonlyProp}
            autoComplete={autocomplete}
            placeholder={placeholder}
            autoFocus={autofocus}
            form={form}
            value={modelValue}
            onChange={handleInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={onKeyDown}
          />
          {(suffix || showClear || showPasswordArea) && (
            <span className="vk-input__suffix" onClick={keepFocus}>
              {suffix}
              {showClear && (
                <Icon
                  name="circle-xmark"
                  className="vk-input__clear"
                  onClick={clear}
                  onMouseDown={NOOP}
                />
              )}
              {showPasswordArea && passwordVisible && (
                <Icon
                  name="eye"
                  className="vk-input__password"
                  onClick={togglePasswordVisible}
                />
              )}
              {showPasswordArea && !passwordVisible && (
                <Icon
                  name="eye-slash"
                  className="vk-input__password"
                  onClick={togglePasswordVisible}
                />
              )}
            </span>
          )}
        </div>
        {append && <div className="vk-input__append">{append}</div>}
      </div>
    );
  }
);

export default Input;
