import { FC } from 'react';
import { BaseInput } from 'ui';
import { useForm } from 'libs/form';
import { useField } from 'libs/form/use-field/use-field.ts';

export const LoginForm: FC = () => {
  const {
    values,
    onFieldChange,
  } = useForm<{ password: string }>({
    values: {
      password: {
        defaultValue: '',
      },
    },
  });

  const {
    field: nameField, validate, onFieldChange: onNameChange, reset,
  } = useField({
    name: 'email',
    defaultValue: '',
    rules: ['required', 'email'],
  });

  const onNameBlur = () => {
    validate();
    // eslint-disable-next-line no-console
    console.log(nameField);
  };

  return (
    <div>
      <BaseInput
        type='text'
        placeholder='Логин'
        name='email'
        value={nameField.value as string}
        onChange={onNameChange}
        onBlur={onNameBlur}
        onInput={reset}
        status={nameField.isValid ? undefined : 'error'}
        style={{ marginBottom: 10 }}
        clearable
      />

      <BaseInput
        type='password'
        name='password'
        placeholder='Пароль'
        value={values.password}
        onChange={(value) => onFieldChange('password', value)}
        style={{ marginBottom: 10 }}
      />
      <button type='submit' style={{ width: '100%', textAlign: 'center' }}>Войти</button>
    </div>
  );
};
