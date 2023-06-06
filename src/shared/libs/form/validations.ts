import {
  RulesCollection,
  DefineRule,
  BetweenParams,
  SimpleValidationRuleFunction,
} from './types.ts';

export const RULES: RulesCollection = new Map();

export const defineRule: DefineRule = (id, validator) => {
  RULES.set(id, validator as Parameters<DefineRule>[1]);
};

const isNullOrUndefined = (value: unknown) => value === null || value === undefined;

const isEmptyArray = (arr: unknown[]) => Array.isArray(arr) && arr.length === 0;

const isEmpty = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  return Array.isArray(value) && value.length === 0;
};

const requiredValidator = (value: any): boolean => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false) {
    return false;
  }
  return !!String(value).trim().length;
};

const alphaValidator = (value: unknown): boolean => {
  if (isEmpty(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every((val) => alphaValidator(val));
  }
  const valueAsString = String(value);

  return /^[А-ЯЁ]*$/i.test(valueAsString);
};

const alphaDashValidator = (value: unknown): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every((val) => alphaDashValidator(val));
  }
  const valueAsString = String(value);
  return /^[0-9А-ЯЁ_-]*$/i.test(valueAsString);
};

const alphaNumValidator = (value: unknown): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every((val) => alphaNumValidator(val));
  }
  const valueAsString = String(value);
  return /^[0-9А-ЯЁ]*$/i.test(valueAsString);
};

const alphaSpacesValidator = (value: unknown): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every((val) => alphaSpacesValidator(val));
  }
  const valueAsString = String(value);
  return /^[А-ЯЁ\s]*$/i.test(valueAsString);
};

const getBetweenParams = (params: BetweenParams)
: { min: string | number, max: string | number } => {
  if (Array.isArray(params)) {
    return { min: params[0], max: params[1] };
  }
  return params;
};

const betweenValidator: SimpleValidationRuleFunction<unknown, BetweenParams> = (value, params) => {
  if (!params) throw new Error('missing required params - min, max');

  if (isEmpty(value)) {
    return true;
  }
  const { min, max } = getBetweenParams(params);
  if (Array.isArray(value)) {
    return value.every((val) => betweenValidator(val, { min, max }));
  }
  const valueAsNumber = Number(value);
  return Number(min) <= valueAsNumber && Number(max) >= valueAsNumber;
};

const getSingleParam = <T>(
  params: [string] | T,
  paramName: keyof T,
) => (Array.isArray(params) ? params[0] : params[paramName]);

const confirmedValidator = (value: unknown, params: [string] | {
  target: string;
}): boolean => {
  const target = getSingleParam(params, 'target');
  return String(value) === String(target);
};

const digitsValidator = (value: unknown, params: [string | number] | {
  length: string | number;
}): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  const length = getSingleParam(params, 'length');
  if (Array.isArray(value)) {
    return value.every((val) => digitsValidator(val, { length }));
  }
  const strVal = String(value);
  return /^[0-9]*$/.test(strVal) && strVal.length === Number(length);
};

const emailValidator = (value: unknown): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (Array.isArray(value)) {
    return value.every((val) => re.test(String(val)));
  }
  return re.test(String(value));
};

const integerValidator = (value: unknown): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every((val) => /^-?[0-9]+$/.test(String(val)));
  }
  return /^-?[0-9]+$/.test(String(value));
};

const isValidator = (value: unknown, params: [string] | {
  other: string;
}): boolean => {
  const other = getSingleParam(params, 'other');
  return value === other;
};

const isNotValidator = (value: unknown, params: [string] | {
  other: string;
}) => {
  const other = getSingleParam(params, 'other');
  return value !== other;
};

const lengthValidator = (value: unknown, params: [string | number] | {
  length: string | number;
}): boolean => {
  const length = getSingleParam(params, 'length');
  if (isNullOrUndefined(value)) {
    return false;
  }
  if (typeof value === 'number') {
    return String(value).length === Number(length);
  }

  if (typeof value === 'string') {
    return value.length === Number(length);
  }
  if (Array.isArray(value)) {
    return value.length === Number(length);
  }
  return false;
};

const maxLengthValidator = (value: unknown, params: [string | number] | {
  length: string | number;
}): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  const length = getSingleParam(params, 'length');
  if (Array.isArray(value)) {
    return value.every((val) => maxLengthValidator(val, { length }));
  }
  return String(value).length <= Number(length);
};

const maxValueValidator = (value: unknown, params: [string] | {
  max: string | number;
}): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  const max = getSingleParam(params, 'max');
  if (Array.isArray(value)) {
    return value.length > 0 && value.every((val) => maxValueValidator(val, { max }));
  }
  return Number(value) <= Number(max);
};

const minValidator = (value: unknown, params: [string | number] | {
  length: string | number;
}): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  const length = getSingleParam(params, 'length');
  if (Array.isArray(value)) {
    return value.every((val) => minValidator(val, { length }));
  }
  return String(value).length >= Number(length);
};

const minValueValidator = (value: unknown, params: [string] | {
  min: string | number;
}): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  const min = getSingleParam(params, 'min');
  if (Array.isArray(value)) {
    return value.length > 0 && value.every((val) => minValueValidator(val, { min }));
  }
  return Number(value) >= Number(min);
};

const notOneOfValidator = (value: unknown, list: unknown[]): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return !oneOfValidator(value, list);
};

const numericValidator = (value: unknown): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  const testValue = (val: unknown) => {
    const strValue = String(val);
    return /^[0-9]+$/.test(strValue);
  };
  if (Array.isArray(value)) {
    return value.every(testValue);
  }
  return testValue(value);
};

const oneOfValidator = (value: unknown, list: unknown[]): boolean => {
  if (isEmpty(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every((val) => oneOfValidator(val, list));
  }
  return Array.from(list).some((item) => item === value);
};

defineRule('required', requiredValidator);
defineRule('alpha', alphaValidator);
defineRule('alpha_dash', alphaDashValidator);
defineRule('alpha_num', alphaNumValidator);
defineRule('alpha_spaces', alphaSpacesValidator);
defineRule('between', betweenValidator);
defineRule('confirmed', confirmedValidator);
defineRule('digits', digitsValidator);
defineRule('email', emailValidator);
defineRule('integer', integerValidator);
defineRule('is', isValidator);
defineRule('is_not', isNotValidator);
defineRule('length', lengthValidator);
defineRule('max_length', maxLengthValidator);
defineRule('min_length', minValidator);
defineRule('min', minValueValidator);
defineRule('max', maxValueValidator);
defineRule('not_one_of', notOneOfValidator);
defineRule('one_of', oneOfValidator);
defineRule('numeric', numericValidator);
