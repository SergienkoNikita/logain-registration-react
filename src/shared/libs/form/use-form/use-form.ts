// import { useState } from 'react';
import { FieldProps, UseField } from 'libs/form/use-field/types.ts';
import { useField } from 'libs/form/use-field';
import { useMemo } from 'react';

// interface FieldOptions<T> {
//   defaultValue?: T[keyof T] | string;
//   rules?: Array<(value: keyof T | string) => string>;
// }
// interface Props {
//   values: FieldProps[];
// }
//
// interface UseFormApi<T> {
//   values: Record<keyof T, T[keyof T] | string>;
//   errors: Record<keyof T, string> | {};
//   onFieldChange: (fieldName: keyof T, value: T[keyof T]) => void;
//   validateField: (name: keyof T) => void;
//   validate: () => void;
// }

export const useForm = (values: FieldProps[]) => {
  const fields: ReturnType<UseField>[] = [];

  values.forEach((field) => {
    fields.push(useField(field));
  });

  const valid = useMemo<boolean>(() => (
    !fields.filter(({ field }) => !field.isValid).length
  ), [fields]);

  const touched = useMemo<boolean>(() => (
    Boolean(fields.filter(({ field }) => field.touched).length)
  ), [fields]);

  const returnsValues = useMemo(() => fields
    .reduce((accum, field) => {
      // eslint-disable-next-line no-param-reassign
      accum[field.field.name] = {
        value: field.field.value,
        onChange: field.onFieldChange,
      };

      return accum;
    }, <Record<string, { value: unknown, onChange(v: string | number): void }>>{}), [fields]);

  const submit = () => fields
    .reduce((accum, { field }) => {
      // eslint-disable-next-line no-param-reassign
      accum[field.name] = field.value;

      return accum;
    }, <Record<string, string | number | undefined>>{});

  return {
    touched,
    valid,
    fields,
    values: returnsValues,
    submit,
  };
};
