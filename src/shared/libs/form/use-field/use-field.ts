import { useState } from 'react';
import {
  DEFAULT_ERROR_TEXT, DefaultRules, RULES, VALIDATION_ERROR_TEXT,
} from '../validation-types.ts';

type DefaultRulesParams = [string | number]
| { length: string | number }
| { target: string }
| { other: string }
| { min?: string | number, max?: string | number };

type CustomRule = (value: unknown) => string | boolean;

type RuleWithParams = { name: DefaultRules, params: DefaultRulesParams };

type Rule = RuleWithParams | DefaultRules | CustomRule;

type ValidationResult = boolean | string | Promise<boolean | string>;

interface FieldProps {
  name: string;
  defaultValue: string | number;
  rules?: Rule[];
}

export const useField = (props: FieldProps) => {
  const [field, setField] = useState<{
    name: FieldProps['name'];
    value: FieldProps['defaultValue'];
    rules?: Rule[];
    touched: boolean;
    isValid: boolean;
    error: string | null;
  }>({
    name: props.name,
    value: props.defaultValue ?? '',
    rules: props.rules,
    touched: false,
    isValid: true,
    error: null,
  });

  const validateByDefaultRule = (rule: RuleWithParams | DefaultRules)
  : ValidationResult => {
    let result: boolean | string | Promise<boolean | string> = true;

    if (typeof rule === 'string') {
      const handler = RULES.get(rule);
      if (handler) result = handler(field.value, {});
    } else {
      const handler = RULES.get(rule.name);
      if (handler) result = handler(rule.name, rule.params);
    }

    return result;
  };

  const getBaseValidationErrorText = (rule: DefaultRules | RuleWithParams): string => {
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

  const setFieldError = (rule: Rule, validationResult: string | boolean): void => {
    let errorText: string;

    if (typeof validationResult !== 'string') {
      const isBaseValidation = typeof rule !== 'function';

      errorText = isBaseValidation ? getBaseValidationErrorText(rule) : DEFAULT_ERROR_TEXT;
    } else {
      errorText = validationResult;
    }

    setField({ ...field, isValid: false, error: errorText });
  };

  const validate = async (): Promise<void> => {
    if (!field.rules) return;

    let isValid: string | boolean = true;
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const rule of field.rules) {
      if (typeof rule !== 'function') {
        // eslint-disable-next-line no-await-in-loop
        isValid = await validateByDefaultRule(rule);
      }

      if (typeof rule === 'function') {
        // eslint-disable-next-line no-await-in-loop
        isValid = await rule(field.value);
      }

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
