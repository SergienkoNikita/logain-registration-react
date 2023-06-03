import { useState } from 'react';

interface FieldOptions<T> {
  defaultValue?: T[keyof T] | string;
  rules?: Array<(value: keyof T | string) => string>;
}
interface Props<T> {
  values: Record<keyof T, FieldOptions<T>>;
}

interface UseFormApi<T> {
  values: Record<keyof T, T[keyof T] | string>;
  errors: Record<keyof T, string> | {};
  onFieldChange: (fieldName: keyof T, value: T[keyof T]) => void;
  validateField: (name: keyof T) => void;
  validate: () => void;
}

export const useForm = <T>({ values }: Props<T>): UseFormApi<T> => {
  const entries = Object.entries(values) as Array<[keyof T, FieldOptions<T>]>;

  const formFields = entries.reduce((accum, [fieldName, fieldOptions]) => {
    if (!fieldName) return accum;
    // eslint-disable-next-line no-param-reassign
    accum[fieldName] = fieldOptions.defaultValue ?? '';

    return accum;
  }, <Record<keyof T, T[keyof T] | string>>{});

  const [errors, setErrors] = useState<UseFormApi<T>['errors']>({});

  const [formData, setFormData] = useState<UseFormApi<T>['values']>({ ...formFields });

  const onFieldChange: UseFormApi<T>['onFieldChange'] = (fieldName, value) => {
    if (formData[fieldName] === undefined) throw new Error(`Field: ${fieldName as string} - not available`);

    setFormData({ ...formData, [fieldName]: value as string });
  };

  const validateField: UseFormApi<T>['validateField'] = (fieldName) => {
    const currentFieldValue = formData[fieldName];
    const { rules } = values[fieldName];

    if (!rules || typeof currentFieldValue !== 'string') return;

    // eslint-disable-next-line no-restricted-syntax
    for (const rule of rules) {
      const result = rule(currentFieldValue);
      if (result) {
        setErrors({ ...errors, [fieldName]: result });
        break;
      }
    }
  };

  const validate: UseFormApi<T>['validate'] = () => {
    console.log('validate');
  };

  return {
    values: formData,
    errors,
    onFieldChange,
    validateField,
    validate,
  };
};
