import { DefaultRules } from 'libs/form/constants.ts';
import { FieldValidationMeta, ValidationRuleFunction } from 'libs/form/types.ts';

export type UseField = (props: FieldProps) => {
  field: Field,
  onFieldChange: (value: string | number) => void,
  reset: () => void,
  validate: () => Promise<void>,
};

export type DefaultRulesParams = [string | number]
| { length: string | number }
| { target: string }
| { other: string }
| { min?: string | number, max?: string | number };

type CustomRule = (value: unknown) => string | boolean;

type RuleWithParams = { name: DefaultRules, params: DefaultRulesParams };

type Rule = RuleWithParams | DefaultRules | CustomRule;

export const isRuleWithParams = (value: Rule): value is RuleWithParams => {
  if (typeof value === 'function' || typeof value === 'string') return false;

  return Boolean(value.name) && Boolean(value.params);
};

export type FieldProps = {
  name: string;
  defaultValue?: string | number;
  label?: string;
  rules?: Rule[];
};

export type Field = {
  name: FieldProps['name'];
  label?: FieldProps['label']
  value: FieldProps['defaultValue'];
  rules?: FieldProps['rules'];
  touched: boolean;
  isValid: boolean;
  error: string | null;
};

export type GetBaseValidationErrorText = (rule: DefaultRules | RuleWithParams) => string;

export type SetFieldError = (rule: Rule, validationResult: string | boolean) => void;

export type GetValidationParams = (rule: Rule) => {
  params: Record<string, unknown> | DefaultRulesParams,
  ctx: FieldValidationMeta
};

export type GetValidationFunction = (rule: Rule) => ValidationRuleFunction<Field['value'], DefaultRulesParams>;
