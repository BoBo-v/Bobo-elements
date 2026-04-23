import type { ReactNode } from 'react';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type RenderLabelFunc = (option: SelectOption) => ReactNode;
export type CustomFilterFunc = (value: string) => SelectOption[];
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>;

export interface SelectProps {
  modelValue: string;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  renderLabel?: RenderLabelFunc;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomFilterRemoteFunc;
  onChange?: (value: string) => void;
  'onUpdate:modelValue'?: (value: string) => void;
  onVisibleChange?: (visible: boolean) => void;
  onClear?: () => void;
}
