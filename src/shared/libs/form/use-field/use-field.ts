import { useState } from 'react';
import { DEFAULT_ERROR_TEXT, VALIDATION_ERROR_TEXT } from 'libs/form/constants.ts';
import { RULES } from 'libs/form/validations.ts';
import {
  Field,
  GetBaseValidationErrorText,
  GetValidationParams,
  SetFieldError,
  isRuleWithParams, GetValidationFunction, UseField,
} from './types.ts';

export const useField: UseField = (props) => {
  const [field, setField] = useState<Field>({
    name: props.name,
    label: props.label,
    value: props.defaultValue ?? '',
    rules: props.rules,
    touched: false,
    isValid: !props.rules,
    error: null,
  });

  const getBaseValidationErrorText: GetBaseValidationErrorText = (rule) => {
    let errorText: string = '';

    if (typeof rule === 'string') {
      const text = VALIDATION_ERROR_TEXT[rule];

      if (typeof text === 'string') errorText = text;
    } else {
      const fn = VALIDATION_ERROR_TEXT[rule.name];

      if (typeof fn === 'function') errorText = fn(rule.params);
    }

    return errorText;
  };

  const setFieldError: SetFieldError = (rule, validationResult) => {
    let errorText: string;

    if (typeof validationResult !== 'string') {
      const isBaseValidation = typeof rule !== 'function';

      errorText = isBaseValidation ? getBaseValidationErrorText(rule) : DEFAULT_ERROR_TEXT;
    } else {
      errorText = validationResult;
    }

    setField({ ...field, isValid: false, error: errorText });
  };

  const getValidationParams: GetValidationParams = (rule) => {
    const defaultParams: ReturnType<GetValidationParams> = {
      params: {},
      ctx: {
        name: field.name,
        label: field.label,
        value: field.value,
      },
    };

    if (typeof rule === 'string') {
      defaultParams.ctx.rule = { name: rule };
    }

    if (isRuleWithParams(rule)) {
      defaultParams.params = rule.params;
      defaultParams.ctx.rule = { name: rule.name };
    }

    return defaultParams;
  };

  const getValidationFn: GetValidationFunction = (rule) => {
    if (typeof rule === 'function') return rule;

    const handler = RULES.get(typeof rule === 'string' ? rule : rule.name);
    if (!handler) {
      throw new Error(`Rule - ${rule} - not defined`);
    }
    return handler;
  };

  const validate = async (): Promise<void> => {
    if (!field.rules) return;

    let isValid: string | boolean = true;
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const rule of field.rules) {
      const validationParams = getValidationParams(rule);
      const validationFn = getValidationFn(rule);
      // eslint-disable-next-line no-await-in-loop
      isValid = await validationFn(field.value, validationParams.params, validationParams.ctx);

      if (typeof isValid === 'string' || !isValid) {
        setFieldError(rule, isValid);
        break;
      }
    }

    if (isValid) setField({ ...field, isValid: true, error: null });
  };

  const changeFieldValue = (value: string | number): void => {
    setField({ ...field, value, touched: true });
  };

  const reset = (): void => {
    setField({
      name: props.name,
      value: props.defaultValue ?? '',
      rules: props.rules,
      touched: false,
      isValid: true,
      error: null,
    });
  };

  return {
    field,
    onFieldChange: changeFieldValue,
    reset,
    validate,
  };
};
