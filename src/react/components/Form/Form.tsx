import React, { createContext, useRef, forwardRef, useImperativeHandle, useContext } from 'react';
import type { ValidateFieldsError } from 'async-validator';
import type {
  FormProps,
  FormContextType,
  FormItemContextType,
  FormInstance,
  FormValidateFailure,
} from '../../../core/components/form.react.types';
import '../../../components/Form/style.css';

export const FormContext = createContext<FormContextType | null>(null);

const Form = forwardRef<FormInstance, FormProps>(({ model, rules, children }, ref) => {
  const fieldsRef = useRef<FormItemContextType[]>([]);

  const addField = (field: FormItemContextType) => {
    fieldsRef.current.push(field);
  };

  const removeField = (field: FormItemContextType) => {
    if (field.prop) {
      const idx = fieldsRef.current.indexOf(field);
      if (idx !== -1) {
        fieldsRef.current.splice(idx, 1);
      }
    }
  };

  const resetFields = (keys: string[] = []) => {
    const fields = fieldsRef.current;
    const filterArr =
      keys.length > 0 ? fields.filter((f) => keys.includes(f.prop)) : fields;
    filterArr.forEach((f) => f.resetField());
  };

  const clearValidate = (keys: string[] = []) => {
    const fields = fieldsRef.current;
    const filterArr =
      keys.length > 0 ? fields.filter((f) => keys.includes(f.prop)) : fields;
    filterArr.forEach((f) => f.clearValidate());
  };

  const validate = async () => {
    let validationErrors: ValidateFieldsError = {};
    for (const field of fieldsRef.current) {
      try {
        await field.validate('');
      } catch (e) {
        const error = e as FormValidateFailure;
        validationErrors = {
          ...validationErrors,
          ...error.fields,
        };
      }
    }
    if (Object.keys(validationErrors).length === 0) return true;
    return Promise.reject(validationErrors);
  };

  useImperativeHandle(ref, () => ({
    validate,
    resetFields,
    clearValidate,
  }));

  return (
    <FormContext.Provider value={{ model, rules, addField, removeField }}>
      <form className="vk-form">{children}</form>
    </FormContext.Provider>
  );
});

export default Form;
