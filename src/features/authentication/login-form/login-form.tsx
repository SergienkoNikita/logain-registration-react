import { FC } from 'react';
import { BaseInput } from '../../../shared/ui';
import { useForm } from '../../../shared/libs/use-form';

export const LoginForm: FC = () => {
  const {
    values,
    onFieldChange,
    validateField,
  } = useForm<{ name: string, password: string }>({
    values: {
      name: {
        defaultValue: '123',
        rules: [(v) => {
          // eslint-disable-next-line no-console
          console.log(`Not Valid ${v}`);
          return `Not Valid ${v}`;
        }],
      },

      password: {
        defaultValue: '',
      },
    },
  });

  return (
    <div>
      <BaseInput
        type='text'
        placeholder='Логин'
        name='email'
        value={values.name}
        onChange={(value) => onFieldChange('name', value)}
        onBlur={() => validateField('name')}
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
