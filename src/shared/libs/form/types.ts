// eslint-disable-next-line import/no-cycle
import { DefaultRules } from './constants.ts';

export interface FieldValidationMeta {
  name: string;
  label?: string;
  value: unknown;
  rule?: ValidationRule;
}

export interface ValidationRule {
  name: string;
  params?: Record<string, string | number | string[] | number[]>
}

export type ValidationRuleFunction<
  TValue = unknown,
  TParams = unknown[] | Record<string, unknown>,
> = (
  value: TValue,
  params?: TParams,
  ctx?: FieldValidationMeta
) => boolean | string | Promise<boolean | string>;

export type SimpleValidationRuleFunction<
  TValue = unknown,
  TParams = unknown[] | Record<string, unknown>,
> = (
  value: TValue,
  params: TParams
) => boolean | string | Promise<boolean | string>;

export type DefineRule = <
  TValue = string,
  TParams = string[] | number[] | Record<string, string | number>,
>(
  id: string | DefaultRules,
  validator: ValidationRuleFunction<TValue, TParams> | SimpleValidationRuleFunction<TValue, TParams>
) => void;

export type RulesCollection = Map<Parameters<DefineRule>[0], Parameters<DefineRule>[1]>;

export type ValidationErrorText = (params: any) => string;

export type BetweenParams = [string | number, string | number] | {
  min: number | string;
  max: number | string;
};
