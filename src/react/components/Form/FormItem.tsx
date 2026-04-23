import React, { createContext, useState, useRef, useEffect, useContext, useMemo } from 'react';
import Schema from 'async-validator';
import type {
  FormItemProps,
  FormItemContextType,
  ValidateStatusProp,
  FormValidateFailure,
} from '../../../core/components/form.react.types';
import { FormContext } from './Form';

export const FormItemContext = createContext<FormItemContextType | null>(null);

export default function FormItem({ label, prop, children }: FormItemProps) {
  const formContext = useContext(FormContext);
  const [validateStatus, setValidateStatus] = useState<ValidateStatusProp>({
    state: 'init',
    errorMsg: '',
    loading: false,
  });
  const initialValueRef = useRef<any>(null);
  const contextRef = useRef<FormItemContextType | null>(null);

  const innerValue = useMemo(() => {
    const model = formContext?.model;
    if (model && prop && model[prop] != null) {
      return model[prop];
    }
    return null;
  }, [formContext?.model, prop, formContext?.model?.[prop ?? '']]);

  const itemRules = useMemo(() => {
    const rules = formContext?.rules;
    if (rules && prop && rules[prop]) {
      return rules[prop];
    }
    return [];
  }, [formContext?.rules, prop]);

  const getTriggeredRules = (trigger?: string) => {
    if (itemRules) {
      return itemRules.filter((rule) => {
        if (!rule.trigger || !trigger) return true;
        return rule.trigger === trigger;
      });
    }
    return [];
  };

  const isRequired = itemRules.some((rule) => rule.required);

  const validate = async (trigger?: string) => {
    const modelName = prop;
    const triggeredRules = getTriggeredRules(trigger);
    if (triggeredRules.length === 0) {
      return true;
    }
    if (modelName) {
      const validator = new Schema({
        [modelName]: triggeredRules,
      });
      setValidateStatus((s) => ({ ...s, loading: true }));
      return validator
        .validate({ [modelName]: innerValue })
        .then(() => {
          setValidateStatus({ state: 'success', errorMsg: '', loading: false });
        })
        .catch((e: FormValidateFailure) => {
          const { errors } = e;
          setValidateStatus({
            state: 'error',
            errorMsg: errors && errors.length > 0 ? errors[0].message || '' : '',
            loading: false,
          });
          return Promise.reject(e);
        });
    }
  };

  const clearValidate = () => {
    setValidateStatus({ state: 'init', errorMsg: '', loading: false });
  };

  const resetField = () => {
    clearValidate();
    const model = formContext?.model;
    if (model && prop && model[prop] != null) {
      model[prop] = initialValueRef.current;
    }
  };

  // Create a stable context object
  if (!contextRef.current) {
    contextRef.current = {
      validate,
      prop: prop || '',
      clearValidate,
      resetField,
    };
  }
  // Keep the methods up-to-date
  contextRef.current.validate = validate;
  contextRef.current.clearValidate = clearValidate;
  contextRef.current.resetField = resetField;

  useEffect(() => {
    if (prop) {
      initialValueRef.current = innerValue;
      formContext?.addField(contextRef.current!);
    }
    return () => {
      if (contextRef.current) {
        formContext?.removeField(contextRef.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormItemContext.Provider value={contextRef.current}>
      <div
        className={[
          'vk-form-item',
          validateStatus.state === 'error' ? 'is-error' : '',
          validateStatus.state === 'success' ? 'is-success' : '',
          validateStatus.loading ? 'is-loading' : '',
          isRequired ? 'is-required' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label && (
          <label className="vk-form-item__label">{label}</label>
        )}
        <div className="vk-form-item__content">
          {children}
          {validateStatus.state === 'error' && (
            <div className="vk-form-item__error-msg">{validateStatus.errorMsg}</div>
          )}
        </div>
      </div>
    </FormItemContext.Provider>
  );
}
