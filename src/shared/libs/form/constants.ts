// eslint-disable-next-line import/no-cycle
import { ValidationErrorText } from './types.ts';

const DEFAULT_RULES_LIST = [
  'required',
  'alpha',
  'alpha_dash',
  'alpha_num',
  'alpha_spaces',
  'between',
  'confirmed',
  'digits',
  'email',
  'integer',
  'is',
  'is_not',
  'length',
  'max_length',
  'min_length',
  'max',
  'min',
  'not_one_of',
  'one_of',
  'numeric',
] as const;

type AllDefaultRules = typeof DEFAULT_RULES_LIST[number];

export type DefaultRules<T extends AllDefaultRules = AllDefaultRules> = T;

export const DEFAULT_RULES: {
  [p in AllDefaultRules]: p
} = Object.fromEntries(
  DEFAULT_RULES_LIST
    .map((size) => [size, size])
    .filter((size) => size !== undefined),
);

export const DEFAULT_ERROR_TEXT = 'Поле заполнено не верно';
export const VALIDATION_ERROR_TEXT: Record<DefaultRules, ValidationErrorText | string> = {
  required: 'Поле обязательно к заполнению',
  alpha: 'Поле может содержать только буквы',
  alpha_dash: 'Поле может содержать только буквы, цифры и тире',
  alpha_num: 'Поле может содержать только буквы и цифры',
  alpha_spaces: 'Поле может содержать только буквы и тире',
  between: (params: { min: string | number, max: string | number }): string => `Поле может содержать от ${params.min} до ${params.max}`,
  confirmed: 'Поля не совподают',
  digits: ({ length }: { length: string | number }):string => `Поле дожно содержать ${length} цифр`,
  email: 'Не корректный email',
  integer: 'Поле должно быть допустимым целочисленным значением',
  is: ({ other }: { other: string | number }): string => `Поле не соответствует шаблону - ${other}`,
  is_not: ({ other }: { other: string | number }): string => `Поле не должно равляться - ${other}`,
  length: ({ length }: { length: string | number }): string => `Поле должно содержать ${length} элементов`,
  max_length: ({ length }: { length: string | number }): string => `Максимальнаая длинна - ${length}`,
  min_length: ({ length }: { length: string | number }): string => `Минимальная длинна - ${length}`,
  max: ({ max }: { max: string | number }): string => `Максимальное значение - ${max}`,
  min: ({ min }: { min: string | number }): string => `Минимальное значение - ${min}`,
  not_one_of: 'Значение но допустимо',
  one_of: 'Значение но допустимо',
  numeric: 'Значение должно быть числовым',
};
