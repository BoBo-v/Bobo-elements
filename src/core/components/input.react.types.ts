import type { ReactNode } from 'react';

export interface InputProps {
  type?: string;
  modelValue: string;
  size?: 'large' | 'small';
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  form?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  prepend?: ReactNode;
  append?: ReactNode;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onClear?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  'onUpdate:modelValue'?: (value: string) => void;
}

export interface InputRef {
  ref: HTMLInputElement | HTMLTextAreaElement | null;
}
