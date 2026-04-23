import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator';
import type { ReactNode } from 'react';

export interface FormItemRule extends RuleItem {
  trigger?: string;
}
export type FormRules = Record<string, FormItemRule[]>;

export interface FormProps {
  model: Record<string, any>;
  rules?: FormRules;
  children?: ReactNode;
}

export interface FormItemProps {
  label?: string;
  prop?: string;
  children?: ReactNode;
}

export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error';
  errorMsg: string;
  loading: boolean;
}

export interface FormItemContextType {
  prop: string;
  validate: (trigger?: string) => Promise<any>;
  resetField: () => void;
  clearValidate: () => void;
}

export interface FormContextType {
  model: Record<string, any>;
  rules?: FormRules;
  addField: (field: FormItemContextType) => void;
  removeField: (field: FormItemContextType) => void;
}

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormInstance {
  validate: () => Promise<any>;
  resetFields: (props?: string[]) => void;
  clearValidate: (props?: string[]) => void;
}

export interface FormItemInstance {
  validateStatus: ValidateStatusProp;
  validate: (trigger?: string) => Promise<any>;
  resetField: () => void;
  clearValidate: () => void;
}
